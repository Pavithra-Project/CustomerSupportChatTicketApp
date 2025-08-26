package com.examly.springapp.Security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    private final String SECRET_KEY = "your_32_character_minimum_secret_key_here_1234567890!";
    private final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; // 10 hours

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String generateToken(String email, String role) {
    try {
        System.out.println("JwtUtil.generateToken called with email: " + email + ", role: " + role);
        
        SecretKey key = getSigningKey();
        System.out.println("Signing key obtained: " + (key != null ? "YES" : "NO"));
        
        String token = Jwts.builder()
                .subject(email)
                .claim("role", role)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, Jwts.SIG.HS256)
                .compact();
        
        System.out.println("Token generated: " + token);
        System.out.println("Token starts with: " + (token != null && token.length() > 10 ? token.substring(0, 10) : "N/A"));
        
        return token;
    } catch (Exception e) {
        System.err.println("JwtUtil.generateToken ERROR: " + e.getMessage());
        e.printStackTrace();
        throw new RuntimeException("Failed to generate token", e);
    }
}
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, java.util.function.Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parser()
                       .verifyWith(getSigningKey())
                       .build()
                       .parseSignedClaims(token)
                       .getPayload();
        } catch (JwtException e) {
            throw new RuntimeException("Invalid JWT token", e);
        }
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Boolean validateToken(String token, String email) {
        final String username = extractUsername(token);
        return (username.equals(email) && !isTokenExpired(token));
    }

    // NEW METHOD: Generate token with email and role
    public String extractEmail(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    // Optional: Method to extract role from token
    public String extractRole(String token) {
        return extractClaim(token, claims -> claims.get("role", String.class));
    }
}