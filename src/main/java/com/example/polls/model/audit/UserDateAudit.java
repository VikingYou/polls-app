package com.example.polls.model.audit;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

/**
 * @author ycd20
 * @date 23/02/2022
 * @time 22:21
 */
@MappedSuperclass
@JsonIgnoreProperties(
        value = {"createdBy","updatedBy"},
        allowGetters = true
)
@Data
public abstract class UserDateAudit extends DateAudit{

    @CreatedBy
    @Column(updatable = false)
    private Long createdBy;

    @LastModifiedDate
    private Long updatedBy;
}
