package com.example.polls.payload;

import lombok.Data;

import javax.validation.constraints.NotNull;

/**
 * @author ycd20
 * @date 24/02/2022
 * @time 14:36
 */
@Data
public class VoteRequest {

    @NotNull
    private Long choiceId;
}
