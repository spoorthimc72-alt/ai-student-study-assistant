// Optional Java example for the college project explanation.
// The website itself runs with HTML, CSS and JavaScript in the browser.
public class StudyAssistant {
    public static String makeNotes(String topic) {
        return "Notes for " + topic + ": learn the definition, steps and one real engineering example.";
    }

    public static String quizFeedback(String answer) {
        return answer.equalsIgnoreCase("Stack")
            ? "Correct! Stack follows LIFO."
            : "Try again. The correct answer is Stack.";
    }

    public static void main(String[] args) {
        System.out.println(makeNotes("Operating Systems"));
        System.out.println(quizFeedback("Stack"));
    }
}
