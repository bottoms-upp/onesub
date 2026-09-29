package backend.backend.service;

import backend.backend.dto.CategorySpendingResponse;
import backend.backend.dto.DashboardSummaryResponse;
import backend.backend.dto.UpcomingRenewalResponse;
import backend.backend.entity.Subscription;
import backend.backend.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final SubscriptionRepository subscriptionRepository;

    public DashboardSummaryResponse getSummary(Long userId) {
        if (userId == null) {
            return DashboardSummaryResponse.builder()
                    .totalMonthlySpend(BigDecimal.ZERO)
                    .totalYearlySpend(BigDecimal.ZERO)
                    .activeSubscriptions(0L)
                    .cancelledSubscriptions(0L)
                    .upcomingRenewals(0L)
                    .mostExpensiveSubscription("None")
                    .build();
        }

        List<Subscription> upcoming = subscriptionRepository.findByUserIdAndRenewalDateBetween(
                userId,
                LocalDate.now().minusDays(30), // Include overdue or due soon
                LocalDate.now().plusDays(30)
        );

        String expensive = subscriptionRepository.findTopByUserIdOrderByPriceDesc(userId)
                .map(s -> s.getName() + " (₹" + s.getPrice() + ")")
                .orElse("None");

        return DashboardSummaryResponse.builder()
                .totalMonthlySpend(subscriptionRepository.getTotalMonthlySpendByUserId(userId))
                .totalYearlySpend(subscriptionRepository.getTotalYearlySpendByUserId(userId))
                .activeSubscriptions(subscriptionRepository.getActiveSubscriptionsByUserId(userId))
                .cancelledSubscriptions(subscriptionRepository.getCancelledSubscriptionsByUserId(userId))
                .upcomingRenewals((long) upcoming.size())
                .mostExpensiveSubscription(expensive)
                .build();
    }

    public List<CategorySpendingResponse> getCategorySpending(Long userId) {
        if (userId == null) return List.of();
        return subscriptionRepository.getCategorySpendingByUserId(userId);
    }

    public List<UpcomingRenewalResponse> getUpcomingRenewals(Long userId) {
        if (userId == null) return List.of();
        return subscriptionRepository.getUpcomingRenewalsByUserId(
                userId,
                LocalDate.now().minusDays(7), // show recently due or upcoming
                LocalDate.now().plusDays(30)
        );
    }

    public List<Subscription> getRecentSubscriptions(Long userId) {
        if (userId == null) return List.of();
        return subscriptionRepository.findTop5ByUserIdOrderByIdDesc(userId);
    }
}
