from crewai import Task
from crewai import Agent

class DevTeamTasks:
    def architecture_audit_task(self, agent: Agent) -> Task:
        return Task(
            description=(
                "Review the Next.js e-commerce codebase structure, including /api/contact, "
                "/api/bulk-inquiry, and /api/verify-payment. Ensure environment variables like "
                "RESEND_API_KEY and RAZORPAY_KEY_SECRET are properly referenced."
            ),
            expected_output=(
                "A summary report confirming API architecture design, environment variable compliance, "
                "and system modularity."
            ),
            agent=agent
        )

    def email_verification_task(self, agent: Agent) -> Task:
        return Task(
            description=(
                "Verify the Resend API integration in lib/resend.ts and email templates in "
                "lib/email-templates.ts. Ensure HTML emails for Contact, Bulk Inquiry, and Order "
                "Confirmations follow brand styling (#7A1C30, #C59B27) and handle fallback conditions."
            ),
            expected_output=(
                "A detailed breakdown of transactional email templates, sender configuration "
                "(onboarding@resend.dev / custom domain), and error handling procedures."
            ),
            agent=agent
        )

    def qa_validation_task(self, agent: Agent) -> Task:
        return Task(
            description=(
                "Validate that forms (ContactForm and BulkInquiryForm) send proper payload objects "
                "to the Next.js API endpoints and handle loading/success/error UI states appropriately."
            ),
            expected_output=(
                "Verification status of frontend form handlers, API endpoint validation checks, "
                "and zero lint/build issues."
            ),
            agent=agent
        )

    def wholesale_workflow_task(self, agent: Agent) -> Task:
        return Task(
            description=(
                "Audit the wholesale inquiry journey from form submission on /bulk-inquiry to "
                "admin email receipt and customer confirmation letter."
            ),
            expected_output=(
                "A checklist confirming end-to-end B2B supply chain communication flow."
            ),
            agent=agent
        )
