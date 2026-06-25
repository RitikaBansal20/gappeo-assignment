def calculate_match(job_skills: str, resume_text: str):

    required_skills = [
        skill.strip().lower()
        for skill in job_skills.split(",")
        if skill.strip()
    ]

    resume = resume_text.lower()

    matched_skills = []
    missing_skills = []

    for skill in required_skills:

        if skill in resume:
            matched_skills.append(skill)
        else:
            missing_skills.append(skill)

    score = 0

    if required_skills:
        score = round(
            len(matched_skills) / len(required_skills) * 100
        )

    if score >= 85:
        recommendation = "Excellent match. Highly recommended."

    elif score >= 70:
        recommendation = "Good match. Suitable for interview."

    elif score >= 50:
        recommendation = "Average match. Needs further evaluation."

    else:
        recommendation = "Poor match."

    return {
        "score": score,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "recommendation": recommendation
    }