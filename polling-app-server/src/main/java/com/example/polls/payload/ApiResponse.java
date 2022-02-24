package com.example.polls.payload;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author ycd20
 * @date 23/02/2022
 * @time 15:04
 */
@Data
@AllArgsConstructor
public class ApiResponse {
    private Boolean success;
    private String message;
}
