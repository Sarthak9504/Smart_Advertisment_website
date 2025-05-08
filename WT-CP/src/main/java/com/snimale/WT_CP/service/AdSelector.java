package com.snimale.WT_CP.service;

import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Service;


import java.io.File;
import java.io.IOException;
import java.util.*;
import java.net.URL;

@Service
public class AdSelector {
    public List<String> getSubdirectoryNames(String path) {
        List<String> subdirectories = new ArrayList<>();
        ClassLoader classLoader = getClass().getClassLoader();
        URL resource = classLoader.getResource(path);

        if (resource == null) {
            throw new IllegalArgumentException("Path not found: " + path);
        }

        File baseDir = new File(resource.getFile());
        if (baseDir.isDirectory()) {
            for (File file : baseDir.listFiles()) {
                if (file.isDirectory()) {
                    subdirectories.add(file.getName());
                }
            }
        }

        return subdirectories;
    }

    public List<String> getImageNames(String path) {
        List<String> imageNames = new ArrayList<>();
        ClassLoader classLoader = getClass().getClassLoader();
        URL resource = classLoader.getResource(path);

        if (resource == null) {
            throw new IllegalArgumentException("Folder not found: " + path);
        }

        File folder = new File(resource.getFile());
        if (folder.isDirectory()) {
            for (File file : folder.listFiles()) {
                if (!file.isDirectory()) {
                    imageNames.add(file.getName());
                }
            }
        }

        return imageNames;
    }

    public String getOptimalAdSubFolder(HashMap<String, Integer> keywordsMap, String adType) {
        List<String> subdirectories = getSubdirectoryNames(adType);

       int maxFreq = 0;
       String optimalSubDir = "/default";
        for(Map.Entry<String, Integer> e : keywordsMap.entrySet()) {
            if(e.getValue() > maxFreq && subdirectories.contains(e.getKey())) {
                optimalSubDir = "/" + e.getKey();
                maxFreq = e.getValue();
            }
        }

        System.out.println("Keywords Frequency Map: "+keywordsMap);
        System.out.println("Available and Optimal Category: "+ optimalSubDir);

        return optimalSubDir;
    }

    public String getOptmialAdImage(HashMap<String, Integer> keywordsMap, String imageFolder) {
        // get image keywords
        List<String> images =  getImageNames(imageFolder);
        List<HashSet<String>> imagesKeywords = new ArrayList<>();
        for(String image : images) {
            String imageName = image.split("\\.")[0];
            String[] imageKeywords = imageName.split("_");

            HashSet<String> keywords = new HashSet<>();
            Collections.addAll(keywords, imageKeywords);
            System.out.println(keywords);
            imagesKeywords.add(keywords);
        }

        // get optimal ad by intersection
        String optimalAd = images.get(0);
        int intersectionScore = 0;
        for(int i=0; i<imagesKeywords.size(); i++) {
            int temp = 0;
            for(Map.Entry<String, Integer> e : keywordsMap.entrySet()) {
                if(imagesKeywords.get(i).contains(e.getKey())) temp++;
            }
            if(temp>intersectionScore) {
                intersectionScore=temp;
                optimalAd = images.get(i);
            }
        }
        System.out.println("Top Ad Keywords Intersection: " + intersectionScore);
        System.out.println("Top Ad: "+ optimalAd);
        return imageFolder +"/" + optimalAd;
    }

    public HashMap<String, Integer> getKeywordsMapFromStrList(String strListKeywords) {
        String[] keywords = strListKeywords.substring(1, strListKeywords.length()-1).split(",");
        for (int i = 0; i < keywords.length; i++) {
            keywords[i] = keywords[i].replaceAll("^\"|\"$", ""); // remove quotes if present
        }

        // make frequency map of search keywords
        HashMap<String, Integer> keywordsMap = new HashMap<>();
        for (String s : keywords) {
            for(String s_ : s.split(" ")) {
                if (keywordsMap.containsKey(s_)) {
                    keywordsMap.put(s_, keywordsMap.get(s_) + 1);
                } else {
                    keywordsMap.put(s_, 1);
                }
            }
        }

        return keywordsMap;
    }

    public String getOptimalAd(String strListKeywords, String adType) {
        HashMap<String, Integer> keywordsMap = getKeywordsMapFromStrList(strListKeywords);
        return getOptmialAdImage(keywordsMap, adType+getOptimalAdSubFolder(keywordsMap, adType));
    }

    public String getOptimalAd(String strListKeywordsCategory, String strListKeywordsProduct, String adType) {
        HashMap<String, Integer> keywordsMapCategory = getKeywordsMapFromStrList(strListKeywordsCategory);
        HashMap<String, Integer> keywordsMapProduct = getKeywordsMapFromStrList(strListKeywordsProduct);

        return getOptmialAdImage(keywordsMapProduct, adType+getOptimalAdSubFolder(keywordsMapCategory, adType));
    }
}
