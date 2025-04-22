package com.snimale.WT_CP.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.snimale.WT_CP.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.Resource;

import javax.sound.midi.SysexMessage;
import java.net.URL;
import java.util.HashMap;
import java.util.List;

@RestController
public class AdController {
    private final ObjectMapper objectMapper = new ObjectMapper();
    HashMap<String, Integer> categoryFreqList = new HashMap<>();

    // This class serves ad of a given name
    @Autowired
    ImageService imageService;

    @CrossOrigin(
            origins = "http://localhost:3000",
            allowCredentials = "true"
    )
    @GetMapping(value = "/ads/{ad_name}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<Resource> getAd2(@PathVariable String ad_name) {
        final ByteArrayResource inputStream = imageService.getImage(ad_name);
        return ResponseEntity
                .status(HttpStatus.OK)
                .contentLength(inputStream.contentLength())
                .body(inputStream);
    }

    @CrossOrigin(
            origins = "http://localhost:3000",
            allowCredentials = "true"
    )
    @GetMapping(value = "/categorical-ads/{ad_number}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<Resource> getCategoricalAd(@CookieValue(name = "ctr-product-category", defaultValue = "[]") String categoryList, @PathVariable Integer ad_number) {
        if(categoryList.compareTo("[]") == 0) {
            // return random AD, index does not matter
            System.out.println("No Cookie: Sending Random Advertisement");
            categoryFreqList.clear();

            final ByteArrayResource inputStream = imageService.getImage("watch");
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .contentLength(inputStream.contentLength())
                    .body(inputStream);
        } else {
            try {
                List<String> myList = objectMapper.readValue(categoryList, new TypeReference<List<String>>() {});
                categoryFreqList.clear();
                for(int i=0; i<myList.size(); i++) {
                    if(categoryFreqList.containsKey(myList.get(i))) {
                        categoryFreqList.put(myList.get(i), categoryFreqList.get(myList.get(i))+1);
                    } else {
                        categoryFreqList.put(myList.get(i), 1);
                    }
                }

                System.out.println(categoryFreqList.toString());

                final ByteArrayResource inputStream = imageService.getImage("perfume");
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .contentLength(inputStream.contentLength())
                        .body(inputStream);
            } catch (Exception e) {
                System.out.println("Failed to parse cookie: Sending Random Advertisement");
            }
        }

        final ByteArrayResource inputStream = imageService.getImage("watch");
        return ResponseEntity
                .status(HttpStatus.OK)
                .contentLength(inputStream.contentLength())
                .body(inputStream);
    }
}
