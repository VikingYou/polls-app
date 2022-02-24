package com.example.polls.model;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author ycd20
 * @date 23/02/2022
 * @time 22:46
 */
@Data
@AllArgsConstructor
public class ChoiceVoteCount {
    private Long choiceId;

    private Long voteCount;
}
