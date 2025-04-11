package com.snimale.WT_CP.controller;

import com.snimale.WT_CP.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.core.io.Resource;

import java.net.URL;

@RestController
public class AdController {
    // This class serves ad of a given name
    @Autowired
    ImageService imageService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/ads/{ad_name}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<Resource> getAd2(@PathVariable String ad_name) {
        final ByteArrayResource inputStream = imageService.getImage(ad_name);
        return ResponseEntity
                .status(HttpStatus.OK)
                .contentLength(inputStream.contentLength())
                .body(inputStream);
    }
}
