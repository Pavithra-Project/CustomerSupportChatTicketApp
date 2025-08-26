package com.examly.springapp.controller;



import com.examly.springapp.model.KbArticle;
import com.examly.springapp.service.KbArticleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/kb")
public class KbArticleController {

    @Autowired
    private KbArticleService kbArticleService;

    @PostMapping
    public ResponseEntity<KbArticle> createArticle(@Valid @RequestBody KbArticle article) {
        return new ResponseEntity<>(kbArticleService.createArticle(article), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<KbArticle>> getAllArticles() {
        return ResponseEntity.ok(kbArticleService.getAllArticles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<KbArticle> getArticleById(@PathVariable Long id) {
        return ResponseEntity.ok(kbArticleService.getArticleById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<KbArticle> updateArticle(@PathVariable Long id, @Valid @RequestBody KbArticle article) {
        return ResponseEntity.ok(kbArticleService.updateArticle(id, article));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        kbArticleService.deleteArticle(id);
        return ResponseEntity.noContent().build();
    }
}
