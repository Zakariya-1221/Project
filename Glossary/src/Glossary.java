import java.util.Comparator;

import components.map.Map;
import components.map.Map1L;
import components.queue.Queue;
import components.queue.Queue1L;
import components.set.Set;
import components.set.Set1L;
import components.simplereader.SimpleReader;
import components.simplereader.SimpleReader1L;
import components.simplewriter.SimpleWriter;
import components.simplewriter.SimpleWriter1L;
import components.stack.Stack;
import components.stack.Stack1L;

/**
 * This program uses a text file to generates an html page of a glossary.
 *
 * @author Zakariya Ahmed
 *
 */
public final class Glossary {

    /**
     * No argument constructor--private to prevent instantiation.
     */
    private Glossary() {
    }

    /**
     * creates comparator to be used when sorting through words.
     */
    private static class StringLT implements Comparator<String> {

        @Override
        public int compare(String o1, String o2) {
            // TODO Auto-generated method stub
            return o1.compareTo(o2);
        }

    }

    /**
     * Read in terms and definition onto a map.
     *
     * @param in
     *            the input stream
     * @return the {@code Map<String,String>} with read in input
     */

    private static Map<String, String> generateMap(SimpleReader in) {

        Map<String, String> wordDef = new Map1L<String, String>();

        // create stacks for words and for definitions
        Stack<String> terms = new Stack1L<String>();
        Stack<String> definitions = new Stack1L<String>();
        Stack<String> lines = new Stack1L<String>();

        // create string for definition with multiple lines
        String def;
        // read in first line from input
        String file = in.nextLine();

        // while the end of the input stream hasn't been reached
        while (!in.atEOS()) {
            // if you reach an empty line, input next line
            if (file.isEmpty()) {
                if (!in.atEOS()) {
                    file = in.nextLine();
                }
            }

            //if line has a whitespace, it is a definition, if not, it is a
            //word

            while (!file.isEmpty()) {
                if (!file.contains(" ")) {
                    terms.push(file);
                    if (!in.atEOS()) {
                        file = in.nextLine();
                    }
                } else if (file.contains(" ")) {
                    while (!file.isEmpty()) {
                        lines.push(file);
                        if (!in.atEOS()) {
                            file = in.nextLine();
                        } else {
                            file = "";
                        }
                    }

                    // if the definition is on multiple lines, then remove
                    //latest line from definition and add to String

                    lines.flip();
                    def = lines.pop();
                    while (lines.length() > 0) {
                        def += " ";
                        def += lines.pop();
                    }

                    // clear lines to avoid aliasing
                    lines.clear();
                    definitions.push(def);
                }
            }
        }
        // adds terms to map from stack
        while (terms.length() > 0) {
            wordDef.add(terms.pop(), definitions.pop());
        }

        return wordDef;

    }

    /**
     * Stores terms from map in a Queue and sorts elements.
     *
     * @param wordDef
     *            the terms and definition stored in a map
     *
     * @return a queue of sorted terms
     */

    private static Queue<String> sortsTerms(Map<String, String> wordDef) {
        Comparator<String> order = new StringLT();
        // store each term in a queue, use order to sort, then returns sorted queue
        Queue<String> qi = new Queue1L<>();

        for (Map.Pair<String, String> p : wordDef) {
            qi.enqueue(p.key());
            qi.sort(order);
        }

        return qi;
    }

    /**
     * Generates the header for the html file.
     *
     * @param outFile
     *            output stream
     */
    private static void outputHeader(SimpleWriter outFile) {

        outFile.println("<html>\n" + "<head>\n" + "\t<title>" + "Glossary"
                + "</title>\n" + "</head>\n" + "<body>\n" + "<h2>" + "Glossary"
                + "</h2>" + "<hr />" + "<h3>" + "Index" + "</h3>" + "<ul>");
    }

    /**
     * Generates hyperlinks for each term on Index.
     *
     * @param out
     *            output stream
     * @param words
     *            the terms and definition stored in a map
     * @param q
     *            Queue of sorted terms
     * @clears q
     *
     * @ensures output to html file with index list
     */

    private static void outputWords(SimpleWriter out, Map<String, String> words,
            Queue<String> q) {

        //sorts terms in map and stores in queue

        // creates links for each term on index page using while loop
        while (q.length() > 0) {
            String term = q.dequeue();
            out.print("<li><a href=\"" + term + ".html\">");
            out.println(term + "</a></li>");
        }
        out.println("</ul>");
        out.println("</body>");
        out.println("</html>");
    }

    /**
     * Generates html pages for each term in the Index.
     *
     * @param wordDef
     *            the terms and definition stored in a map
     * @param folder
     *            location of files
     */

    private static void outputHTMLFiles(String folder,
            Map<String, String> wordDef) {
        boolean link = false;
        Queue<String> newQ = new Queue1L<>();
        //stores each term in a queue
        for (Map.Pair<String, String> term : wordDef) {
            newQ.enqueue(term.key());
        }

        //iterate through each term/definition by term
        while (newQ.length() > 0) {
            String term = newQ.dequeue();
            //create output stream using folder and term name
            SimpleWriter outFile = new SimpleWriter1L(
                    folder + "/" + term + ".html");
            //output to html file
            outFile.println("<html>\n" + "<head>\n" + "\t<title>" + term
                    + "</title>\n" + "</head>\n" + "<body>\n" + "<h2>\n"
                    + "<b>\n" + "<i>\n" + "<font color = \"red\">" + term
                    + "</font>\n" + "</i>\n" + "</b>\n" + "</h2>\n"
                    + "<blockquotes>");

            //create separators set to check each word in definition
            final String separatorStr = " \t, ";
            Set<Character> separatorSet = new Set1L<>();
            generateElements(separatorStr, separatorSet);
            int i = 0;

            for (Map.Pair<String, String> glossary : wordDef) {
                // check if definition contains key/term
                if (wordDef.value(term).contains(glossary.key()) && !link) {
                    link = true;
                    //stores definition into a string to evaluate for term
                    String definition = wordDef.value(term);

                    while (i < definition.length()) {

                        String word = nextWordOrSeparator(definition, i,
                                separatorSet);
                        //creates link if definition contains term
                        if (wordDef.hasKey(word)) {
                            outFile.print("<a href=\"" + word + ".html\">"
                                    + word + "</a>");
                        } else {
                            // prints other words if it's not a term
                            outFile.print(word);
                        }
                        //updates position to check word by word
                        i += word.length();
                    }

                }

            }

            //outputs definition once terms have been hyperlinked
            if (!link) {
                String def = wordDef.value(term);
                outFile.print(def);
            }
            link = false;
            //outputs ending tags for descriptions and link
            outFile.println("</blockquote>");
            outFile.println("<hr />");
            outFile.println(
                    "<p>Return to <a href=\"index.html\">index</a>.</p>");
            outFile.println("</body>");
            outFile.println("</html>");
            outFile.close();

        }
    }

    /**
     * Generates the set of characters in the given {@code String} into the
     * given {@code Set}.
     *
     * @param str
     *            the given {@code String}
     * @param charSet
     *            the {@code Set} to be replaced
     * @replaces charSet
     * @ensures charSet = entries(str)
     */
    public static void generateElements(String str, Set<Character> charSet) {
        assert str != null : "Violation of: str is not null";
        assert charSet != null : "Violation of: charSet is not null";

        charSet.clear();
        for (int i = 0; i < str.length(); i++) {
            if (!charSet.contains(str.charAt(i))) {
                charSet.add(str.charAt(i));
            }
        }

    }

    /**
     * Returns the first "word" (maximal length string of characters not in
     * {@code separators}) or "separator string" (maximal length string of
     * characters in {@code separators}) in the given {@code text} starting at
     * the given {@code position}.
     *
     * @param text
     *            the {@code String} from which to get the word or separator
     *            string
     * @param position
     *            the starting index
     * @param separators
     *            the {@code Set} of separator characters
     * @return the first word or separator string found in {@code text} starting
     *         at index {@code position}
     * @requires 0 <= position < |text|
     * @ensures <pre>
     * nextWordOrSeparator =
     *   text[position, position + |nextWordOrSeparator|)  and
     * if entries(text[position, position + 1)) intersection separators = {}
     * then
     *   entries(nextWordOrSeparator) intersection separators = {}  and
     *   (position + |nextWordOrSeparator| = |text|  or
     *    entries(text[position, position + |nextWordOrSeparator| + 1))
     *      intersection separators /= {})
     * else
     *   entries(nextWordOrSeparator) is subset of separators  and
     *   (position + |nextWordOrSeparator| = |text|  or
     *    entries(text[position, position + |nextWordOrSeparator| + 1))
     *      is not subset of separators)
     * </pre>
     */
    public static String nextWordOrSeparator(String text, int position,
            Set<Character> separators) {
        assert text != null : "Violation of: text is not null";
        assert separators != null : "Violation of: separators is not null";
        assert 0 <= position : "Violation of: 0 <= position";
        assert position < text.length() : "Violation of: position < |text|";

        // restore set

        int i = position;
        String str = "";
        char s = 's';
        int j = 0;

        //store each word into substring,
        while (i < text.length()) {
            s = text.charAt(i);
            if (!separators.contains(text.charAt(i))) {

                str += s;

            } else {
                // ends loop to extract current string made up of
                // non-separators
                i = text.length();
            }

            if (separators.contains(s)) {
                j = position;
                while (j < text.length()) {
                    s = text.charAt(j);
                    if (separators.contains(s)) {
                        str += s;

                    } else {
                        // ends loop to extract current string made up of
                        // separators
                        j = text.length();
                    }
                    j++;
                }
            }
            i++;
        }

        return str;
    }

    /**
     * Main method.
     *
     * @param args
     *            the command line arguments
     */
    public static void main(String[] args) {
        SimpleReader in = new SimpleReader1L();
        SimpleWriter out = new SimpleWriter1L();
        // asks user for file name
        out.print("Enter the name of an input file: ");
        String userInput = in.nextLine();
        SimpleReader file = new SimpleReader1L(userInput);
        // asks user for folder location
        out.print("Enter a name for the output folder: ");
        String folder = in.nextLine();
        // creates output stream using location from user
        SimpleWriter outFile = new SimpleWriter1L(folder + "/index.html");

        // Creates map containing terms and definitions read in from input file.
        Map<String, String> wordDef = generateMap(file);
        Queue<String> qi = sortsTerms(wordDef);

        // creates html pages using input from user utilizing maps and sorted
        // queue
        outputHeader(outFile);
        outputWords(outFile, wordDef, qi);
        outputHTMLFiles(folder, wordDef);

        in.close();
        out.close();
        outFile.close();

    }

}
