package com.example.memesapi.repositories;

import com.example.memesapi.models.Meme;
import org.springframework.data.repository.CrudRepository;

public interface MemeRepository extends CrudRepository<Meme, Long> {
}
