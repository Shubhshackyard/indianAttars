import os
from dotenv import load_dotenv
from crewai import Crew, Process
from agents import DevTeamAgents
from tasks import DevTeamTasks

# Load environment variables
load_dotenv(dotenv_path="../.env")

def run_dev_crew():
    print("=" * 60)
    print("Initializing CrewAI Multi-Agent Team for indianattars MVP")
    print("=" * 60)

    agents = DevTeamAgents()
    tasks = DevTeamTasks()

    # Instantiate AI Agents
    tech_lead = agents.tech_lead_agent()
    email_specialist = agents.email_specialist_agent()
    qa_engineer = agents.qa_engineer_agent()
    ops_lead = agents.operations_lead_agent()

    # Instantiate Tasks
    task1 = tasks.architecture_audit_task(tech_lead)
    task2 = tasks.email_verification_task(email_specialist)
    task3 = tasks.qa_validation_task(qa_engineer)
    task4 = tasks.wholesale_workflow_task(ops_lead)

    # Form the Crew
    crew = Crew(
        agents=[tech_lead, email_specialist, qa_engineer, ops_lead],
        tasks=[task1, task2, task3, task4],
        process=Process.sequential,
        verbose=True
    )

    print("\nStarting Crew Execution...")
    result = crew.kickoff()
    print("\n" + "=" * 60)
    print("CrewAI Execution Completed Successfully!")
    print("=" * 60)
    print(result)

if __name__ == "__main__":
    run_dev_crew()
