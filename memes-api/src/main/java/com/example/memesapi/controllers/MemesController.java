package com.example.memesapi.controllers;

import com.example.memesapi.models.Meme;
import com.example.memesapi.repositories.MemeRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import javax.servlet.http.HttpServletResponse;

@RestController
public class MemesController {

    @Autowired
    private MemeRepository memeRepository;

    @GetMapping("/")
    public Iterable<Meme> findAllMemes() {
        return memeRepository.findAll();
    }

    @GetMapping("/{memeId}")
    public Meme findMemeById(@PathVariable Long memeId) throws NotFoundException{
        Meme foundMeme = memeRepository.findOne(memeId);

        if (foundMeme == null) {
            throw new NotFoundException("Meme with ID of " + memeId + " was not found!");
        }

        return foundMeme;
    }

    @PostMapping("/")
    public Meme createNewMeme(@RequestBody Meme newMeme) {
        return memeRepository.save(newMeme);
    }

    @DeleteMapping("/{userId}")
    public HttpStatus deleteUserById(@PathVariable Long userId) throws EmptyResultDataAccessException {
        memeRepository.delete(userId);
        return HttpStatus.OK;
    }

    @ExceptionHandler
    void handleMemeNotFound(
            NotFoundException exception,
            HttpServletResponse response) throws IOException {

        response.sendError(HttpStatus.NOT_FOUND.value(), exception.getMessage());
    }

    @ExceptionHandler
    void handleDeleteNotFoundException(
            EmptyResultDataAccessException exception,
            HttpServletResponse response) throws IOException {

        response.sendError(HttpStatus.NOT_FOUND.value());
    }
}
