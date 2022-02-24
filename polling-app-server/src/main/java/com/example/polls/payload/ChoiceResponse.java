package com.example.polls.payload;

import lombok.Data;

/**
 * @author ycd20
 * @date 24/02/2022
 * @time 14:39
 */
@Data
public class ChoiceResponse {
    private long id;
    private String text;
    private long voteCount;
}
