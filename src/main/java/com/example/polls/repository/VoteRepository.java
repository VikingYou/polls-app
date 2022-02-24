package com.example.polls.repository;

import com.example.polls.model.ChoiceVoteCount;
import com.example.polls.model.Vote;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author ycd20
 * @date 23/02/2022
 * @time 22:44
 */
@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {

    @Query("SELECT new com.example.polls.model.ChoiceVoteCount(v.choice.id, count(v.id)) from Vote v where v.poll.id in :pollIds GROUP BY v.choice.id")
    List<ChoiceVoteCount> countByPollIdInGroupByChoiceId(@Param("pollIds") List<Long> pollIds);

    @Query("select new com.example.polls.model.ChoiceVoteCount(v.choice.id,count (v.id) ) from Vote v where v.poll.id in :pollIds GROUP BY v.choice.id")
    List<ChoiceVoteCount> countByPollIdGroupByChoiceId(@Param("pollId") Long pollId);

    @Query("select v from Vote v where v.user.id = :userId and v.poll.id in :pollIds")
    List<Vote> findByUserIdAndPollIdIn(@Param("userId") Long userId, @Param("pollIds") List<Long> pollIds);

    @Query("select v from Vote v where  v.user.id = :userId and v.poll.id in :pollId")
    Vote findByUserIdAndPollId(@Param("userId") Long userId, @Param("pollId") Long pollId);

    @Query("select count (v.id) from Vote v where v.user.id=:userId")
    long countByUserId(@Param("userId") Long userId);

    @Query("select v.poll.id from Vote v where v.user.id = :userId")
    Page<Long> findVotedPollIdsByUserId(@Param("userId") Long userId, Pageable pageable);
}