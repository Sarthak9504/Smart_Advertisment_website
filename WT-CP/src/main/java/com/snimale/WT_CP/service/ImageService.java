package com.snimale.WT_CP.service;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;


@Service
public class ImageService {
    public ByteArrayResource getImage(String imageName) {
        URL url = this.getClass().getClassLoader().getResource(imageName+".jpg");
        try (InputStream inputStream = url.openStream()) {
            byte[] bytes = inputStream.readAllBytes();  // Read all bytes from the InputStream
            return new ByteArrayResource(bytes);  // Return the bytes as a resource
        } catch (IOException e) {
            e.printStackTrace();
            return null;  // Return null or handle the error accordingly
        }
    }
}
