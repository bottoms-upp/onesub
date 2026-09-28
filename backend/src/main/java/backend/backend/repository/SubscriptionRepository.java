package backend.backend.repository;

import backend.backend.dto.CategorySpendingResponse;
import backend.backend.dto.UpcomingRenewalResponse;
import backend.backend.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    // Find a subscription by user and subscription name
    Optional<Subscription> findByUserIdAndName(Long userId, String name);

    // Total monthly spending of active subscriptions
    @Query("""
        SELECT COALESCE(SUM(s.price), 0)
        FROM Subscription s
        WHERE s.billingCycle = 'MONTHLY'
        AND s.status = 'ACTIVE'
    """)
    BigDecimal getTotalMonthlySpend();

    // Count active subscriptions
    @Query("""
        SELECT COUNT(s)
        FROM Subscription s
        WHERE s.status = 'ACTIVE'
    """)
    Long getActiveSubscriptions();

    // Find subscriptions renewing within a date range
    List<Subscription> findByRenewalDateBetween(
            LocalDate start,
            LocalDate end
    );

    // Find the most expensive subscription
    Optional<Subscription> findTopByOrderByPriceDesc();

    // Latest subscriptions (useful for Recent Activity later)
    List<Subscription> findTop5ByOrderByIdDesc();

    @Query("""
        SELECT new backend.backend.dto.CategorySpendingResponse(
            c.name,
            COALESCE(SUM(s.price),0)
        )
        FROM Subscription s
        JOIN s.category c
        WHERE s.status='ACTIVE'
        GROUP BY c.name
        ORDER BY SUM(s.price) DESC
""")
    List<CategorySpendingResponse> getCategorySpending();


    @Query("""
        SELECT new backend.backend.dto.UpcomingRenewalResponse(
            s.name,
            s.provider,
            s.renewalDate
        )
        FROM Subscription s
        WHERE s.status='ACTIVE'
        AND s.renewalDate BETWEEN :startDate AND :endDate
        ORDER BY s.renewalDate ASC
""")
    List<UpcomingRenewalResponse> getUpcomingRenewals(
            LocalDate startDate,
            LocalDate endDate
    );
}