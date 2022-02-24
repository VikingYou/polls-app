package com.example.polls.payload;

import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;

/**
 * @author ycd20
 * @date 24/02/2022
 * @time 14:34
 */
@Data
public class PollLength {

    @NotNull
    @Max(7)
    private Integer days;

    @NotNull
    @Max(23)
    private Integer hours;
}
