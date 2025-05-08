package com.snimale.WT_CP.controller;

import com.snimale.WT_CP.service.AdSelector;
import com.snimale.WT_CP.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.Resource;

import java.util.HashMap;

@RestController
public class AdController {
    @Autowired
    ImageService imageService;
    @Autowired
    AdSelector adSelector;


    @CrossOrigin(
            origins = "http://localhost:3000",
            allowCredentials = "true"
    )
    @GetMapping(value = "/search-ads", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<Resource> getSearchAd(@CookieValue(name="search-history", defaultValue = "[]") String searchHistory) {
        if(searchHistory.compareTo("[]") == 0) {
            System.out.println("\n\nCookie Not Found!");
            final ByteArrayResource inputStream = imageService.getImage("search/watch/watch_black_friday_analog_chrome_leather.png");
            return ResponseEntity.status(HttpStatus.OK).contentLength(inputStream.contentLength()).body(inputStream);
        } else {
            System.out.println("\n\nCookie Found!");
            String optimalAdPath = adSelector.getOptimalAd(searchHistory, "search");

            System.out.println("Sending Advertisement...");
            final ByteArrayResource inputStream = imageService.getImage(optimalAdPath);
            System.out.println("Ad Sent!");
            return ResponseEntity.status(HttpStatus.OK).contentLength(inputStream.contentLength()).body(inputStream);
        }
    }

    @CrossOrigin(
            origins = "http://localhost:3000",
            allowCredentials = "true"
    )
    @GetMapping(value = "/categorical-ads", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<Resource> getCategoricalAd(@CookieValue(name="ctr-product-name", defaultValue = "[]") String productNames, @CookieValue(name="ctr-product-category", defaultValue = "[]") String productCategory) {
        if(productNames.compareTo("[]") == 0 || productCategory.compareTo("[]") == 0) {
            System.out.println("\n\nCookie Not Found!");
            final ByteArrayResource inputStream = imageService.getImage("categorical/laptop/MacBook.png");
            return ResponseEntity.status(HttpStatus.OK).contentLength(inputStream.contentLength()).body(inputStream);
        } else {
            System.out.println("\n\nCookie Found!");
            String optimalAdPath = adSelector.getOptimalAd(productCategory, productNames, "categorical");

            System.out.println("Sending Advertisement...");
            final ByteArrayResource inputStream = imageService.getImage(optimalAdPath);
            System.out.println("Ad Sent!");
            return ResponseEntity.status(HttpStatus.OK).contentLength(inputStream.contentLength()).body(inputStream);
        }
    }
}
