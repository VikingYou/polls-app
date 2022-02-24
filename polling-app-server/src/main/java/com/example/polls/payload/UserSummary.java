package com.example.polls.payload;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author ycd20
 * @date 24/02/2022
 * @time 14:36
 */
@Data
@AllArgsConstructor
public class UserSummary {
    private Long id;

    private String username;

    private String name;
}
