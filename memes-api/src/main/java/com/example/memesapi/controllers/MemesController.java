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

    @DeleteMapping("/{memeId}")
    public HttpStatus deleteMemeById(@PathVariable Long memeId) throws EmptyResultDataAccessException {
        memeRepository.delete(memeId);
        return HttpStatus.OK;
    }

    @PatchMapping("/{memeId}")
    public Meme updateMemeById(@PathVariable Long memeId, @RequestBody Meme memeRequest) throws NotFoundException{
        Meme memeFromDb = memeRepository.findOne(memeId);

        if (memeFromDb == null) {
            throw new NotFoundException("Meme with ID of " + memeId + " was not found!");
        }

        memeFromDb.setUrl(memeRequest.getUrl());

        return memeRepository.save(memeFromDb);
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
