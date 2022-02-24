package com.example.polls.payload;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;

/**
 * @author ycd20
 * @date 24/02/2022
 * @time 14:38
 */
@Data
@AllArgsConstructor
public class UserProfile {

    private Long id;

    private String username;

    private String name;

    private Instant joinedAt;

    private Long pollCount;

    private Long voteCount;
}
