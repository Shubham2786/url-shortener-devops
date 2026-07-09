package com.url.shortener.controllers;

import com.url.shortener.dtos.ClickEventDto;
import com.url.shortener.dtos.UrlMappingDto;
import com.url.shortener.models.User;
import com.url.shortener.service.UrlMappingService;
import com.url.shortener.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/urls")
@AllArgsConstructor
public class UrlMappingController {

    private final UrlMappingService urlMappingService;
    private final UserService userService;

    @PostMapping("/shorten")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createShortUrl(@RequestBody Map<String, String> request, Principal principal) {
        String originalUrl = request.get("originalUrl");
        String customAlias = request.get("customAlias");
        User user = userService.findByUsername(principal.getName());
        UrlMappingDto urlMappingDto = urlMappingService.createShortUrl(originalUrl, customAlias, user);
        return ResponseEntity.ok(urlMappingDto);
    }

    @GetMapping("/myUrls")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getUserUrls(Principal principal) {
        User user = userService.findByUsername(principal.getName());
        List<UrlMappingDto> urls = urlMappingService.getUrlsByUser(user);
        return ResponseEntity.ok(urls);
    }

    @GetMapping("/analytics/{shortUrl}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getUrlAnalytics(@PathVariable String shortUrl,
                                             @RequestParam String startDate,
                                             @RequestParam String endDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        LocalDateTime start = LocalDateTime.parse(startDate, formatter);
        LocalDateTime end = LocalDateTime.parse(endDate, formatter);
        List<ClickEventDto> clickEvents = urlMappingService.getClickEventsByDate(shortUrl, start, end);
        return ResponseEntity.ok(clickEvents);
    }

    @GetMapping("/analytics/totalClicks")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getTotalClicksByDate(Principal principal,
                                                  @RequestParam String startDate,
                                                  @RequestParam String endDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;
        LocalDate start = LocalDate.parse(startDate, formatter);
        LocalDate end = LocalDate.parse(endDate, formatter);
        User user = userService.findByUsername(principal.getName());
        Map<LocalDate, Long> totalClicks = urlMappingService.getTotalClicksByUserAndDate(user, start, end);
        return ResponseEntity.ok(totalClicks);
    }
}
