package com.example.memesapi.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MemesController {

    @GetMapping("/")
    public String findAllUsers() {
        return "It's working!!!";
    }
}
