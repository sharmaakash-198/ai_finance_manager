import { Body, Container, Button, Head, Heading, Html, Preview, Section, Text } from "@react-email/components";
import * as React from "react";

export default function Email({
    userName = "akku",
    type = "monthly-report",
    data = {
        month: "December",
      stats: {
        totalIncome: 5000,
        totalExpenses: 3500,
        byCategory: {
          housing: 1500,
          groceries: 600,
          transportation: 400,
          entertainment: 300,
          utilities: 700,
        },
      },
      insights: [
        "Your housing expenses are 43% of your total spending - consider reviewing your housing costs.",
        "Great job keeping entertainment expenses under control this month!",
        "Setting up automatic savings could help you save 20% more of your income.",
      ],
    },
}) {
    if (type === "monthly-report") {
        return (
      <Html>
        <Head />
        <Preview>Your Monthly Financial Report</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>📊 Monthly Financial Report</Heading>

            <Text style={styles.text}>Hello {userName},</Text>
            <Text style={styles.text}>
              Here&rsquo;s your financial summary for {data?.month}:
            </Text>

            {/* Main Stats */}
            <Section style={styles.statsContainer}>
              <div style={styles.stat}>
                <Text style={styles.text}>Total Income</Text>
                <Text style={styles.heading}>₹{data?.stats.totalIncome}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Total Expenses</Text>
                <Text style={styles.heading}>₹{data?.stats.totalExpenses}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Net</Text>
                <Text style={styles.heading}>
                  ₹{data?.stats.totalIncome - data?.stats.totalExpenses}
                </Text>
              </div>
            </Section>

            {/* Category Breakdown */}
            {data?.stats?.byCategory && (
              <Section style={styles.section}>
                <Heading style={styles.heading}>📂 Expenses by Category</Heading>
                {Object.entries(data?.stats.byCategory).map(
                  ([category, amount]) => (
                    <div key={category} style={styles.row}>
                      <Text style={styles.text}>{category}</Text>
                      <Text style={styles.text}>₹{amount}</Text>
                    </div>
                  )
                )}
              </Section>
            )}

            {/* AI Insights */}
            {data?.insights && (
              <Section style={styles.section}>
                <Heading style={styles.heading}>💡 AI Finance Manager Insights</Heading>
                {data.insights.map((insight, index) => (
                  <Text key={index} style={styles.text}>
                    • {insight}
                  </Text>
                ))}
              </Section>
            )}

            {/* <Text style={styles.footer}>
              Thank you for using AI Finance Manager. Keep tracking your finances for better
              financial health!

            </Text> */}
          </Container>
        </Body>
      </Html>
    );

    }
    if (type === "budget-alert") {
        return (
            <Html>
                <Head />
                <Preview>Budget Alert</Preview>
                <Body style={styles.body}>
                    <Container style={styles.container}>
                        <Heading style={styles.title}>Budget Alert</Heading>
                        <Text style={styles.text}>Hello {userName},</Text>
                        <Text style={styles.text}>
                            You&rsquo;ve used{" "}
                            {typeof data?.percentageUsed === "number"
                                ? data.percentageUsed.toFixed(1)
                                : "N/A"}
                            % of your monthly budget.
                        </Text>

                        <Section style={styles.statsContainer}>
                            <div style={styles.stat}>
                                <Text style={styles.text}>Budget Amount</Text>
                                <Text style={styles.heading}>₹{data?.budgetAmount}</Text>
                            </div>
                            <div style={styles.stat}>
                                <Text style={styles.text}>Spent So Far</Text>
                                <Text style={styles.heading}>₹{data?.totalExpenses}</Text>
                            </div>
                            <div style={styles.stat}>
                                <Text style={styles.text}>Remaining</Text>
                                <Text style={styles.heading}>
                                    ₹{data?.budgetAmount - data?.totalExpenses}
                                </Text>
                            </div>
                        </Section>
                    </Container>
                </Body>
            </Html>
        );
    }

}


const styles = {
  body: {
    backgroundColor: "#f0f4f8",
    fontFamily: "'Segoe UI', sans-serif",
  },
  container: {
    background: "linear-gradient(to bottom right, #ffffff, #f0faff)",
    margin: "0 auto",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
  },
  title: {
    color: "#4F46E5", // Indigo
    fontSize: "36px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "24px",
    textShadow: "1px 1px 0 #e0e7ff",
  },
  heading: {
    color: "#0f172a", // Slate
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "12px",
  },
  text: {
    color: "#334155", // Cool Gray
    fontSize: "16px",
    lineHeight: "1.6",
    marginBottom: "16px",
  },
  section: {
    marginTop: "30px",
    padding: "24px",
    backgroundColor: "#e0f7fa", // Light teal
    borderRadius: "8px",
    border: "1px solid #bae6fd",
  },
  statsContainer: {
    margin: "32px 0",
    padding: "24px",
    background: "linear-gradient(to right, #a78bfa, #fcd34d)", // Purple to Yellow
    borderRadius: "10px",
    color: "#1f2937",
  },
  stat: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "16px",
    marginBottom: "16px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.06)",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px dashed #cbd5e1",
  },
  footer: {
    color: "#6b7280",
    fontSize: "14px",
    textAlign: "center",
    marginTop: "32px",
    paddingTop: "16px",
    borderTop: "1px solid #e5e7eb",
  },
};
