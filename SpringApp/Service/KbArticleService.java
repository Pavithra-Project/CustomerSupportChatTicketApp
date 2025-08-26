package com.examly.springapp.service;

import com.examly.springapp.model.KbArticle;
import com.examly.springapp.repository.KbArticleRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KbArticleService {

    @Autowired
    private KbArticleRepository kbArticleRepo;

    public KbArticle createArticle(KbArticle article) {
        return kbArticleRepo.save(article);
    }

    public List<KbArticle> getAllArticles() {
        return kbArticleRepo.findAll();
    }

    public KbArticle getArticleById(Long id) {
        return kbArticleRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Article not found with id: " + id));
    }

    public KbArticle updateArticle(Long id, KbArticle updatedArticle) {
        KbArticle existing = getArticleById(id);
        existing.setTitle(updatedArticle.getTitle());
        existing.setContent(updatedArticle.getContent());
        return kbArticleRepo.save(existing);
    }

    public void deleteArticle(Long id) {
        if (!kbArticleRepo.existsById(id)) {
            throw new EntityNotFoundException("Article not found with id: " + id);
        }
        kbArticleRepo.deleteById(id);
    }
}
