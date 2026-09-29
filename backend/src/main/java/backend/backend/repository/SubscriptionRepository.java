package backend.backend.repository;

import backend.backend.dto.CategorySpendingResponse;
import backend.backend.dto.UpcomingRenewalResponse;
import backend.backend.entity.Subscription;
import backend.backend.entity.SubscriptionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    List<Subscription> findByUserId(Long userId);

    List<Subscription> findByUserIdAndStatus(Long userId, SubscriptionStatus status);

    Optional<Subscription> findByUserIdAndName(Long userId, String name);

    @Query("""
        SELECT COALESCE(SUM(
            CASE 
                WHEN s.billingCycle = 'MONTHLY' THEN s.price 
                WHEN s.billingCycle = 'YEARLY' THEN s.price / 12 
                ELSE s.price 
            END
        ), 0)
        FROM Subscription s
        WHERE s.user.id = :userId
        AND s.status = 'ACTIVE'
    """)
    BigDecimal getTotalMonthlySpendByUserId(@Param("userId") Long userId);

    @Query("""
        SELECT COALESCE(SUM(
            CASE 
                WHEN s.billingCycle = 'MONTHLY' THEN s.price * 12 
                WHEN s.billingCycle = 'YEARLY' THEN s.price 
                ELSE s.price 
            END
        ), 0)
        FROM Subscription s
        WHERE s.user.id = :userId
        AND s.status = 'ACTIVE'
    """)
    BigDecimal getTotalYearlySpendByUserId(@Param("userId") Long userId);

    @Query("""
        SELECT COUNT(s)
        FROM Subscription s
        WHERE s.user.id = :userId
        AND s.status = 'ACTIVE'
    """)
    Long getActiveSubscriptionsByUserId(@Param("userId") Long userId);

    @Query("""
        SELECT COUNT(s)
        FROM Subscription s
        WHERE s.user.id = :userId
        AND s.status = 'CANCELLED'
    """)
    Long getCancelledSubscriptionsByUserId(@Param("userId") Long userId);

    List<Subscription> findByUserIdAndRenewalDateBetween(
            Long userId,
            LocalDate start,
            LocalDate end
    );

    Optional<Subscription> findTopByUserIdOrderByPriceDesc(Long userId);

    List<Subscription> findTop5ByUserIdOrderByIdDesc(Long userId);

    @Query("""
        SELECT new backend.backend.dto.CategorySpendingResponse(
            c.name,
            COALESCE(SUM(s.price), 0)
        )
        FROM Subscription s
        JOIN s.category c
        WHERE s.user.id = :userId
        AND s.status = 'ACTIVE'
        GROUP BY c.name
        ORDER BY SUM(s.price) DESC
    """)
    List<CategorySpendingResponse> getCategorySpendingByUserId(@Param("userId") Long userId);

    @Query("""
        SELECT new backend.backend.dto.UpcomingRenewalResponse(
            s.name,
            s.provider,
            s.renewalDate
        )
        FROM Subscription s
        WHERE s.user.id = :userId
        AND s.status = 'ACTIVE'
        AND s.renewalDate BETWEEN :startDate AND :endDate
        ORDER BY s.renewalDate ASC
    """)
    List<UpcomingRenewalResponse> getUpcomingRenewalsByUserId(
            @Param("userId") Long userId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );
}