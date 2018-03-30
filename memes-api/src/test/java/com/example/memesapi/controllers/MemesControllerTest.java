package com.example.memesapi.controllers;


import com.example.memesapi.models.Meme;
import com.example.memesapi.repositories.MemeRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.http.MediaType;

import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.mockito.BDDMockito.given;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
@WebMvcTest(MemesController.class)
public class MemesControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MemeRepository mockMemeRepository;

    private Meme newMeme;
    private Meme updatedMeme;

    @Autowired
    private ObjectMapper jsonObjectMapper;

    @Before
    public void setUp() {
        Meme firstMeme = new Meme(
                "testing"
        );

        Meme secondMeme = new Meme(
                "testing2"
        );

        updatedMeme = new Meme(
                "testing_updated"
        );


        Iterable<Meme> mockMemes =
                Stream.of(firstMeme, secondMeme).collect(Collectors.toList());

        given(mockMemeRepository.findAll()).willReturn(mockMemes);
        given(mockMemeRepository.findOne(1L)).willReturn(firstMeme);
        given(mockMemeRepository.findOne(4L)).willReturn(null);
        doAnswer(invocation -> {
            throw new EmptyResultDataAccessException("ERROR MESSAGE FROM MOCK!!!", 1234);
        }).when(mockMemeRepository).delete(4L);

        newMeme = new Meme("testing3");
        given(mockMemeRepository.save(newMeme)).willReturn(newMeme);
        given(mockMemeRepository.save(updatedMeme)).willReturn(updatedMeme);
    }

    @Test
    public void findAllMemes_success_returnsStatusOK() throws Exception {

        this.mockMvc
                .perform(get("/"))
                .andExpect(status().isOk());
    }

    @Test
    public void findAllMemes_success_returnAllMemesAsJSON() throws Exception {

        this.mockMvc
                .perform(get("/"))
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    public void findAllMemes_success_returnUserNameForEachUser() throws Exception {

        this.mockMvc
                .perform(get("/"))
                .andExpect(jsonPath("$[0].url", is("testing")));
    }

    @Test
    public void findMemeById_success_returnsStatusOK() throws Exception {

        this.mockMvc
                .perform(get("/1"))
                .andExpect(status().isOk());
    }

    @Test
    public void findMemeById_success_returnUrl() throws Exception {

        this.mockMvc
                .perform(get("/1"))
                .andExpect(jsonPath("$.url", is("testing")));
    }

    @Test
    public void findMemeById_failure_memeNotFoundReturns404() throws Exception {

        this.mockMvc
                .perform(get("/4"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void findMemeById_failure_memeNotFoundReturnsNotFoundErrorMessage() throws Exception {

        this.mockMvc
                .perform(get("/4"))
                .andExpect(status().reason(containsString("Meme with ID of 4 was not found!")));
    }

    @Test
    public void deleteMemeById_success_returnsStatusOk() throws Exception {

        this.mockMvc
                .perform(delete("/1"))
                .andExpect(status().isOk());
    }

    @Test
    public void deleteMemeById_success_deletesViaRepository() throws Exception {

        this.mockMvc.perform(delete("/1"));

        verify(mockMemeRepository, times(1)).delete(1L);
    }

    @Test
    public void deleteMemeById_failure_userNotFoundReturns404() throws Exception {

        this.mockMvc
                .perform(delete("/4"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void createMeme_success_returnsStatusOk() throws Exception {

        this.mockMvc
                .perform(
                        post("/")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(newMeme))
                )
                .andExpect(status().isOk());
    }

    @Test
    public void createMeme_success_returnsUrl() throws Exception {

        this.mockMvc
                .perform(
                        post("/")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(newMeme))
                )
                .andExpect(jsonPath("$.url", is("testing3")));
    }

    @Test
    public void updateMemeById_success_returnsStatusOk() throws Exception {

        this.mockMvc
                .perform(
                        patch("/1")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(updatedMeme))
                )
                .andExpect(status().isOk());
    }

    @Test
    public void updateMemeById_success_returnsUpdatedURL() throws Exception {

        this.mockMvc
                .perform(
                        patch("/1")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(updatedMeme))
                )
                .andExpect(jsonPath("$.url", is("testing_updated")));
    }

    @Test
    public void updateMemeById_failure_memeNotFoundReturns404() throws Exception {

        this.mockMvc
                .perform(
                        patch("/4")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(updatedMeme))
                )
                .andExpect(status().isNotFound());
    }

    @Test
    public void updateMemeById_failure_memeNotFoundReturnsNotFoundErrorMessage() throws Exception {

        this.mockMvc
                .perform(
                        patch("/4")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(updatedMeme))
                )
                .andExpect(status().reason(containsString("Meme with ID of 4 was not found!")));
    }

}
