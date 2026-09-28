package backend.backend.service;

import backend.backend.dto.DashboardSummaryResponse;
import backend.backend.entity.Subscription;
import backend.backend.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final SubscriptionRepository subscriptionRepository;

    public DashboardSummaryResponse getSummary() {

        List<Subscription> upcoming =
                subscriptionRepository.findByRenewalDateBetween(
                        LocalDate.now(),
                        LocalDate.now().plusDays(7));

        String expensive =
                subscriptionRepository.findTopByOrderByPriceDesc()
                        .map(Subscription::getName)
                        .orElse("None");

        return DashboardSummaryResponse.builder()
                .totalMonthlySpend(subscriptionRepository.getTotalMonthlySpend())
                .activeSubscriptions(subscriptionRepository.getActiveSubscriptions())
                .upcomingRenewals((long) upcoming.size())
                .mostExpensiveSubscription(expensive)
                .build();
    }
}
