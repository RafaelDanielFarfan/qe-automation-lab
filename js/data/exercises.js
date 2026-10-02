// ================= EXERCISES =================
// tests: [expression, expected] — JS/TS share; Python has its own.
const EX = [
 {id:"evens", tag:"coding", level:"Warm-up", title:"Filtrar pares sin mutar",
  es:"Dado un array de enteros, devuelve un array nuevo solo con los números pares, sin modificar el original.",
  en:"Given an integer array, return a new array containing only the even numbers, without modifying the original array.",
  hint:"Recorre una vez y agrega a una colección nueva. Ojo con los negativos: -2 % 2 === 0, pero -3 % 2 es -1 en Java y JS.",
  follow:"What is the time and space complexity? How would you do it with Streams?",
  js:{fn:"filterEven", starter:"function filterEven(nums) {\n  // your code\n}\n\nconsole.log(filterEven([1, 2, 3, 4, 5, 6]));",
      tests:[["filterEven([1,2,3,4,5,6])","[2,4,6]"],["filterEven([])","[]"],["filterEven([-3,-2,0,7])","[-2,0]"],["(()=>{const a=[1,2,3,4];filterEven(a);return a})()","[1,2,3,4]"]]},
  ts:{starter:"function filterEven(nums: number[]): number[] {\n  // your code\n}\n\nconsole.log(filterEven([1, 2, 3, 4, 5, 6]));",
      solution:"function filterEven(nums: number[]): number[] {\n  return nums.filter(n => n % 2 === 0);\n}"},
  python:{starter:"def filter_even(nums):\n    # your code\n    pass\n\nprint(filter_even([1, 2, 3, 4, 5, 6]))",
      tests:[["filter_even([1,2,3,4,5,6])","[2,4,6]"],["filter_even([])","[]"],["filter_even([-3,-2,0,7])","[-2,0]"]],
      solution:"def filter_even(nums):\n    return [n for n in nums if n % 2 == 0]"},
  java:{starter:"import java.util.*;\n\npublic class Main {\n    public static int[] filterEven(int[] nums) {\n        // your code\n        return new int[0];\n    }\n\n    public static void main(String[] args) {\n        int[] input = {1, 2, 3, 4, 5, 6};\n        System.out.println(Arrays.toString(filterEven(input)));\n        System.out.println(Arrays.toString(input));\n    }\n}",
      solution:"public static int[] filterEven(int[] nums) {\n    if (nums == null) return new int[0];\n    return Arrays.stream(nums).filter(n -> n % 2 == 0).toArray();\n}",
      tests:[["Arrays.toString(Main.filterEven(new int[]{1,2,3,4,5,6}))","\"[2, 4, 6]\""],["Arrays.toString(Main.filterEven(new int[]{}))","\"[]\""],["Arrays.toString(Main.filterEven(new int[]{-3,-2,0,7}))","\"[-2, 0]\""]]}},

 {id:"reverse", tag:"coding", level:"Warm-up", title:"Invertir un string",
  es:"Invierte un string sin usar métodos de reverse incorporados.",
  en:"Reverse a string without using any built-in reverse method.",
  hint:"Dos punteros o recorrer desde el final. En Java, StringBuilder es eficiente; concatenar String en un loop es O(n²).",
  follow:"Why is String concatenation in a loop slow in Java? What is StringBuilder?",
  js:{fn:"reverseString", starter:"function reverseString(s) {\n  // your code\n}\n\nconsole.log(reverseString('playwright'));",
      tests:[["reverseString('playwright')","'thgirwyalp'"],["reverseString('')","''"],["reverseString('a')","'a'"],["reverseString('Ab C')","'C bA'"]]},
  ts:{starter:"function reverseString(s: string): string {\n  // your code\n}\n\nconsole.log(reverseString('playwright'));",
      solution:"function reverseString(s: string): string {\n  let out = '';\n  for (let i = s.length - 1; i >= 0; i--) out += s[i];\n  return out;\n}"},
  python:{starter:"def reverse_string(s):\n    # your code (no s[::-1], no reversed)\n    pass\n\nprint(reverse_string('playwright'))",
      tests:[["reverse_string('playwright')","'thgirwyalp'"],["reverse_string('')","''"],["reverse_string('Ab C')","'C bA'"]],
      solution:"def reverse_string(s):\n    out = []\n    for i in range(len(s) - 1, -1, -1):\n        out.append(s[i])\n    return ''.join(out)"},
  java:{starter:"public class Main {\n    public static String reverse(String s) {\n        // your code\n        return \"\";\n    }\n\n    public static void main(String[] args) {\n        System.out.println(reverse(\"playwright\"));\n    }\n}",
      solution:"public static String reverse(String s) {\n    char[] c = s.toCharArray();\n    for (int i = 0, j = c.length - 1; i < j; i++, j--) {\n        char t = c[i]; c[i] = c[j]; c[j] = t;\n    }\n    return new String(c);\n}",
      tests:[["Main.reverse(\"playwright\")","\"thgirwyalp\""],["Main.reverse(\"\")","\"\""],["Main.reverse(\"a\")","\"a\""],["Main.reverse(\"Ab C\")","\"C bA\""]]}},

 {id:"palindrome", tag:"coding", level:"Fácil", title:"Palíndromo",
  es:"Devuelve true si el texto es palíndromo, ignorando mayúsculas, espacios y signos de puntuación.",
  en:"Return true if the input is a palindrome, ignoring case, spaces and punctuation.",
  hint:"Normaliza (minúsculas + solo letras/dígitos) y compara con dos punteros.",
  follow:"Can you do it in O(1) extra space?",
  js:{fn:"isPalindrome", starter:"function isPalindrome(s) {\n  // your code\n}\n\nconsole.log(isPalindrome('A man, a plan, a canal: Panama'));",
      tests:[["isPalindrome('A man, a plan, a canal: Panama')","true"],["isPalindrome('race a car')","false"],["isPalindrome('')","true"],["isPalindrome('Anita lava la tina')","true"]]},
  ts:{starter:"function isPalindrome(s: string): boolean {\n  // your code\n}\n\nconsole.log(isPalindrome('A man, a plan, a canal: Panama'));",
      solution:"function isPalindrome(s: string): boolean {\n  const c = s.toLowerCase().replace(/[^a-z0-9]/g, '');\n  for (let i = 0, j = c.length - 1; i < j; i++, j--) {\n    if (c[i] !== c[j]) return false;\n  }\n  return true;\n}"},
  python:{starter:"def is_palindrome(s):\n    # your code\n    pass\n\nprint(is_palindrome('A man, a plan, a canal: Panama'))",
      tests:[["is_palindrome('A man, a plan, a canal: Panama')","True"],["is_palindrome('race a car')","False"],["is_palindrome('')","True"]],
      solution:"def is_palindrome(s):\n    c = [ch.lower() for ch in s if ch.isalnum()]\n    return c == c[::-1]"},
  java:{starter:"public class Main {\n    public static boolean isPalindrome(String s) {\n        // your code\n        return false;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(isPalindrome(\"A man, a plan, a canal: Panama\"));\n        System.out.println(isPalindrome(\"race a car\"));\n    }\n}",
      solution:"public static boolean isPalindrome(String s) {\n    int i = 0, j = s.length() - 1;\n    while (i < j) {\n        while (i < j && !Character.isLetterOrDigit(s.charAt(i))) i++;\n        while (i < j && !Character.isLetterOrDigit(s.charAt(j))) j--;\n        if (Character.toLowerCase(s.charAt(i++)) != Character.toLowerCase(s.charAt(j--))) return false;\n    }\n    return true;\n}",
      tests:[["Main.isPalindrome(\"A man, a plan, a canal: Panama\")","\"true\""],["Main.isPalindrome(\"race a car\")","\"false\""],["Main.isPalindrome(\"\")","\"true\""],["Main.isPalindrome(\"Anita lava la tina\")","\"true\""]]}},

 {id:"freq", tag:"coding", level:"Fácil", title:"Frecuencia de caracteres",
  es:"Devuelve un mapa con cuántas veces aparece cada carácter (ignora espacios).",
  en:"Return a map with the count of each character in the string, ignoring spaces.",
  hint:"Un HashMap / dict / objeto. En Java: map.merge(c, 1, Integer::sum).",
  follow:"How would you return the most frequent character? What if there's a tie?",
  js:{fn:"charFrequency", starter:"function charFrequency(s) {\n  // return an object like { a: 2, b: 1 }\n}\n\nconsole.log(charFrequency('hello world'));",
      tests:[["charFrequency('hello world')","{h:1,e:1,l:3,o:2,w:1,r:1,d:1}"],["charFrequency('')","{}"],["charFrequency('aaa')","{a:3}"]]},
  ts:{starter:"function charFrequency(s: string): Record<string, number> {\n  // your code\n}\n\nconsole.log(charFrequency('hello world'));",
      solution:"function charFrequency(s: string): Record<string, number> {\n  const freq: Record<string, number> = {};\n  for (const c of s) {\n    if (c === ' ') continue;\n    freq[c] = (freq[c] ?? 0) + 1;\n  }\n  return freq;\n}"},
  python:{starter:"def char_frequency(s):\n    # your code\n    pass\n\nprint(char_frequency('hello world'))",
      tests:[["char_frequency('hello world')","{'h':1,'e':1,'l':3,'o':2,'w':1,'r':1,'d':1}"],["char_frequency('')","{}"]],
      solution:"def char_frequency(s):\n    freq = {}\n    for c in s:\n        if c != ' ':\n            freq[c] = freq.get(c, 0) + 1\n    return freq"},
  java:{starter:"import java.util.*;\n\npublic class Main {\n    public static Map<Character, Integer> charFrequency(String s) {\n        // your code\n        return new HashMap<>();\n    }\n\n    public static void main(String[] args) {\n        System.out.println(charFrequency(\"hello world\"));\n    }\n}",
      solution:"public static Map<Character, Integer> charFrequency(String s) {\n    Map<Character, Integer> freq = new LinkedHashMap<>();\n    for (char c : s.toCharArray()) {\n        if (c != ' ') freq.merge(c, 1, Integer::sum);\n    }\n    return freq;\n}",
      tests:[["new TreeMap<>(Main.charFrequency(\"hello world\")).toString()","\"{d=1, e=1, h=1, l=3, o=2, r=1, w=1}\""],["new TreeMap<>(Main.charFrequency(\"\")).toString()","\"{}\""],["new TreeMap<>(Main.charFrequency(\"aaa\")).toString()","\"{a=3}\""]]}},

 {id:"dupes", tag:"coding", level:"Fácil", title:"Encontrar duplicados",
  es:"Devuelve los valores que aparecen más de una vez, sin repetir y ordenados ascendentemente.",
  en:"Return the values that appear more than once, without repetition, sorted ascending.",
  hint:"Dos sets: seen y duplicates. Al final ordena.",
  follow:"Why a HashSet and not a List for 'seen'? What is the complexity of contains() in each?",
  js:{fn:"findDuplicates", starter:"function findDuplicates(nums) {\n  // your code\n}\n\nconsole.log(findDuplicates([4, 3, 2, 7, 8, 2, 3, 1, 3]));",
      tests:[["findDuplicates([4,3,2,7,8,2,3,1,3])","[2,3]"],["findDuplicates([1,2,3])","[]"],["findDuplicates([10,-1,10,-1,5])","[-1,10]"]]},
  ts:{starter:"function findDuplicates(nums: number[]): number[] {\n  // your code\n}\n\nconsole.log(findDuplicates([4, 3, 2, 7, 8, 2, 3, 1, 3]));",
      solution:"function findDuplicates(nums: number[]): number[] {\n  const seen = new Set<number>();\n  const dup = new Set<number>();\n  for (const n of nums) (seen.has(n) ? dup : seen).add(n);\n  return [...dup].sort((a, b) => a - b);\n}"},
  python:{starter:"def find_duplicates(nums):\n    # your code\n    pass\n\nprint(find_duplicates([4, 3, 2, 7, 8, 2, 3, 1, 3]))",
      tests:[["find_duplicates([4,3,2,7,8,2,3,1,3])","[2,3]"],["find_duplicates([1,2,3])","[]"],["find_duplicates([10,-1,10,-1,5])","[-1,10]"]],
      solution:"def find_duplicates(nums):\n    seen, dup = set(), set()\n    for n in nums:\n        (dup if n in seen else seen).add(n)\n    return sorted(dup)"},
  java:{starter:"import java.util.*;\n\npublic class Main {\n    public static List<Integer> findDuplicates(int[] nums) {\n        // your code\n        return new ArrayList<>();\n    }\n\n    public static void main(String[] args) {\n        System.out.println(findDuplicates(new int[]{4, 3, 2, 7, 8, 2, 3, 1, 3}));\n    }\n}",
      solution:"public static List<Integer> findDuplicates(int[] nums) {\n    Set<Integer> seen = new HashSet<>();\n    Set<Integer> dup = new TreeSet<>();\n    for (int n : nums) if (!seen.add(n)) dup.add(n);\n    return new ArrayList<>(dup);\n}",
      tests:[["Main.findDuplicates(new int[]{4,3,2,7,8,2,3,1,3})","\"[2, 3]\""],["Main.findDuplicates(new int[]{1,2,3})","\"[]\""],["Main.findDuplicates(new int[]{10,-1,10,-1,5})","\"[-1, 10]\""]]}},

 {id:"firstUnique", tag:"coding", level:"Media", title:"Primer carácter no repetido",
  es:"Devuelve el primer carácter que no se repite. Si no hay, devuelve null (None en Python).",
  en:"Return the first non-repeating character in a string, or null if there is none.",
  hint:"Primera pasada: contar. Segunda pasada: el primero con conteo 1.",
  follow:"Which Java Map keeps insertion order and why would it help here?",
  js:{fn:"firstUnique", starter:"function firstUnique(s) {\n  // your code\n}\n\nconsole.log(firstUnique('swiss'));",
      tests:[["firstUnique('swiss')","'w'"],["firstUnique('aabb')","null"],["firstUnique('keyboard')","'k'"],["firstUnique('')","null"]]},
  ts:{starter:"function firstUnique(s: string): string | null {\n  // your code\n}\n\nconsole.log(firstUnique('swiss'));",
      solution:"function firstUnique(s: string): string | null {\n  const count = new Map<string, number>();\n  for (const c of s) count.set(c, (count.get(c) ?? 0) + 1);\n  for (const c of s) if (count.get(c) === 1) return c;\n  return null;\n}"},
  python:{starter:"def first_unique(s):\n    # your code\n    pass\n\nprint(first_unique('swiss'))",
      tests:[["first_unique('swiss')","'w'"],["first_unique('aabb')","None"],["first_unique('keyboard')","'k'"]],
      solution:"def first_unique(s):\n    count = {}\n    for c in s:\n        count[c] = count.get(c, 0) + 1\n    for c in s:\n        if count[c] == 1:\n            return c\n    return None"},
  java:{starter:"import java.util.*;\n\npublic class Main {\n    public static Character firstUnique(String s) {\n        // your code\n        return null;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(firstUnique(\"swiss\"));\n        System.out.println(firstUnique(\"aabb\"));\n    }\n}",
      solution:"public static Character firstUnique(String s) {\n    Map<Character, Integer> count = new LinkedHashMap<>();\n    for (char c : s.toCharArray()) count.merge(c, 1, Integer::sum);\n    for (Map.Entry<Character, Integer> e : count.entrySet())\n        if (e.getValue() == 1) return e.getKey();\n    return null;\n}",
      tests:[["Main.firstUnique(\"swiss\")","\"w\""],["Main.firstUnique(\"aabb\")","\"null\""],["Main.firstUnique(\"keyboard\")","\"k\""],["Main.firstUnique(\"\")","\"null\""]]}},

 {id:"twoSum", tag:"coding", level:"Media", title:"Two Sum",
  es:"Devuelve los índices de los dos números que suman el objetivo. Si no existen, devuelve un array vacío.",
  en:"Given an array and a target, return the indices of the two numbers that add up to the target, or an empty array.",
  hint:"Un mapa valor → índice. Para cada n, busca target - n antes de insertar n.",
  follow:"The brute force is O(n²). Explain why the map version is O(n).",
  js:{fn:"twoSum", starter:"function twoSum(nums, target) {\n  // your code\n}\n\nconsole.log(twoSum([2, 7, 11, 15], 9));",
      tests:[["twoSum([2,7,11,15],9)","[0,1]"],["twoSum([3,2,4],6)","[1,2]"],["twoSum([3,3],6)","[0,1]"],["twoSum([1,2],10)","[]"]]},
  ts:{starter:"function twoSum(nums: number[], target: number): number[] {\n  // your code\n}\n\nconsole.log(twoSum([2, 7, 11, 15], 9));",
      solution:"function twoSum(nums: number[], target: number): number[] {\n  const idx = new Map<number, number>();\n  for (let i = 0; i < nums.length; i++) {\n    const j = idx.get(target - nums[i]);\n    if (j !== undefined) return [j, i];\n    idx.set(nums[i], i);\n  }\n  return [];\n}"},
  python:{starter:"def two_sum(nums, target):\n    # your code\n    pass\n\nprint(two_sum([2, 7, 11, 15], 9))",
      tests:[["two_sum([2,7,11,15],9)","[0,1]"],["two_sum([3,2,4],6)","[1,2]"],["two_sum([1,2],10)","[]"]],
      solution:"def two_sum(nums, target):\n    idx = {}\n    for i, n in enumerate(nums):\n        if target - n in idx:\n            return [idx[target - n], i]\n        idx[n] = i\n    return []"},
  java:{starter:"import java.util.*;\n\npublic class Main {\n    public static int[] twoSum(int[] nums, int target) {\n        // your code\n        return new int[0];\n    }\n\n    public static void main(String[] args) {\n        System.out.println(Arrays.toString(twoSum(new int[]{2, 7, 11, 15}, 9)));\n    }\n}",
      solution:"public static int[] twoSum(int[] nums, int target) {\n    Map<Integer, Integer> idx = new HashMap<>();\n    for (int i = 0; i < nums.length; i++) {\n        Integer j = idx.get(target - nums[i]);\n        if (j != null) return new int[]{j, i};\n        idx.put(nums[i], i);\n    }\n    return new int[0];\n}",
      tests:[["Arrays.toString(Main.twoSum(new int[]{2,7,11,15},9))","\"[0, 1]\""],["Arrays.toString(Main.twoSum(new int[]{3,2,4},6))","\"[1, 2]\""],["Arrays.toString(Main.twoSum(new int[]{3,3},6))","\"[0, 1]\""],["Arrays.toString(Main.twoSum(new int[]{1,2},10))","\"[]\""]]}},

 {id:"anagram", tag:"coding", level:"Fácil", title:"Anagramas",
  es:"Devuelve true si dos palabras son anagramas (ignora mayúsculas y espacios).",
  en:"Return true if two strings are anagrams of each other, ignoring case and spaces.",
  hint:"Ordenar ambos (O(n log n)) o contar con un mapa (O(n)).",
  follow:"Compare both approaches. Which one would you pick and why?",
  js:{fn:"isAnagram", starter:"function isAnagram(a, b) {\n  // your code\n}\n\nconsole.log(isAnagram('Listen', 'Silent'));",
      tests:[["isAnagram('Listen','Silent')","true"],["isAnagram('Dormitory','Dirty room')","true"],["isAnagram('abc','abd')","false"],["isAnagram('aab','ab')","false"]]},
  ts:{starter:"function isAnagram(a: string, b: string): boolean {\n  // your code\n}\n\nconsole.log(isAnagram('Listen', 'Silent'));",
      solution:"function isAnagram(a: string, b: string): boolean {\n  const norm = (s: string) => s.toLowerCase().replace(/\\s/g, '').split('').sort().join('');\n  return norm(a) === norm(b);\n}"},
  python:{starter:"def is_anagram(a, b):\n    # your code\n    pass\n\nprint(is_anagram('Listen', 'Silent'))",
      tests:[["is_anagram('Listen','Silent')","True"],["is_anagram('Dormitory','Dirty room')","True"],["is_anagram('abc','abd')","False"]],
      solution:"def is_anagram(a, b):\n    norm = lambda s: sorted(s.lower().replace(' ', ''))\n    return norm(a) == norm(b)"},
  java:{starter:"import java.util.*;\n\npublic class Main {\n    public static boolean isAnagram(String a, String b) {\n        // your code\n        return false;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(isAnagram(\"Listen\", \"Silent\"));\n    }\n}",
      solution:"public static boolean isAnagram(String a, String b) {\n    char[] x = a.replace(\" \", \"\").toLowerCase().toCharArray();\n    char[] y = b.replace(\" \", \"\").toLowerCase().toCharArray();\n    Arrays.sort(x); Arrays.sort(y);\n    return Arrays.equals(x, y);\n}",
      tests:[["Main.isAnagram(\"Listen\",\"Silent\")","\"true\""],["Main.isAnagram(\"Dormitory\",\"Dirty room\")","\"true\""],["Main.isAnagram(\"abc\",\"abd\")","\"false\""],["Main.isAnagram(\"aab\",\"ab\")","\"false\""]]}},

 {id:"secondLargest", tag:"coding", level:"Media", title:"Segundo mayor distinto",
  es:"Devuelve el segundo valor más grande distinto. Si no existe, null (None).",
  en:"Return the second largest distinct value in the array, or null if it doesn't exist.",
  hint:"Una sola pasada con dos variables: first y second. Cuidado con duplicados del máximo.",
  follow:"What edge cases would you test for this function?",
  js:{fn:"secondLargest", starter:"function secondLargest(nums) {\n  // your code\n}\n\nconsole.log(secondLargest([5, 1, 5, 3]));",
      tests:[["secondLargest([5,1,5,3])","3"],["secondLargest([7,7,7])","null"],["secondLargest([])","null"],["secondLargest([-1,-5,-3])","-3"]]},
  ts:{starter:"function secondLargest(nums: number[]): number | null {\n  // your code\n}\n\nconsole.log(secondLargest([5, 1, 5, 3]));",
      solution:"function secondLargest(nums: number[]): number | null {\n  let first = -Infinity, second = -Infinity;\n  for (const n of nums) {\n    if (n > first) { second = first; first = n; }\n    else if (n < first && n > second) second = n;\n  }\n  return second === -Infinity ? null : second;\n}"},
  python:{starter:"def second_largest(nums):\n    # your code\n    pass\n\nprint(second_largest([5, 1, 5, 3]))",
      tests:[["second_largest([5,1,5,3])","3"],["second_largest([7,7,7])","None"],["second_largest([-1,-5,-3])","-3"]],
      solution:"def second_largest(nums):\n    distinct = sorted(set(nums), reverse=True)\n    return distinct[1] if len(distinct) > 1 else None"},
  java:{starter:"import java.util.*;\n\npublic class Main {\n    public static Integer secondLargest(int[] nums) {\n        // your code\n        return null;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(secondLargest(new int[]{5, 1, 5, 3}));\n        System.out.println(secondLargest(new int[]{7, 7, 7}));\n    }\n}",
      solution:"public static Integer secondLargest(int[] nums) {\n    Integer first = null, second = null;\n    for (int n : nums) {\n        if (first == null || n > first) { second = first; first = n; }\n        else if (n < first && (second == null || n > second)) second = n;\n    }\n    return second;\n}",
      tests:[["Main.secondLargest(new int[]{5,1,5,3})","\"3\""],["Main.secondLargest(new int[]{7,7,7})","\"null\""],["Main.secondLargest(new int[]{})","\"null\""],["Main.secondLargest(new int[]{-1,-5,-3})","\"-3\""]]}},

 {id:"dedupe", tag:"coding", level:"Fácil", title:"Quitar duplicados conservando orden",
  es:"Elimina duplicados de una lista de strings conservando el orden de la primera aparición.",
  en:"Remove duplicates from a list of strings, keeping the order of first appearance.",
  hint:"Java: LinkedHashSet. JS: new Set mantiene orden de inserción. Python: dict.fromkeys.",
  follow:"What's the difference between HashSet, LinkedHashSet and TreeSet?",
  js:{fn:"dedupe", starter:"function dedupe(items) {\n  // your code\n}\n\nconsole.log(dedupe(['login', 'cart', 'login', 'checkout', 'cart']));",
      tests:[["dedupe(['login','cart','login','checkout','cart'])","['login','cart','checkout']"],["dedupe([])","[]"]]},
  ts:{starter:"function dedupe(items: string[]): string[] {\n  // your code\n}\n\nconsole.log(dedupe(['login', 'cart', 'login', 'checkout', 'cart']));",
      solution:"function dedupe(items: string[]): string[] {\n  return [...new Set(items)];\n}"},
  python:{starter:"def dedupe(items):\n    # your code\n    pass\n\nprint(dedupe(['login', 'cart', 'login', 'checkout', 'cart']))",
      tests:[["dedupe(['login','cart','login','checkout','cart'])","['login','cart','checkout']"],["dedupe([])","[]"]],
      solution:"def dedupe(items):\n    return list(dict.fromkeys(items))"},
  java:{starter:"import java.util.*;\n\npublic class Main {\n    public static List<String> dedupe(List<String> items) {\n        // your code\n        return items;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(dedupe(List.of(\"login\", \"cart\", \"login\", \"checkout\", \"cart\")));\n    }\n}",
      solution:"public static List<String> dedupe(List<String> items) {\n    return new ArrayList<>(new LinkedHashSet<>(items));\n}",
      tests:[["Main.dedupe(List.of(\"login\",\"cart\",\"login\",\"checkout\",\"cart\"))","\"[login, cart, checkout]\""],["Main.dedupe(new ArrayList<String>())","\"[]\""]]}},

 {id:"summary", tag:"coding", level:"Media", title:"Resumen de una ejecución de tests",
  es:"Recibes resultados {name, status, duration}. Devuelve {total, passed, failed, skipped, passRate} donde passRate es el % de passed sobre los ejecutados (sin skipped), redondeado a 1 decimal.",
  en:"Given test results {name, status, duration}, return {total, passed, failed, skipped, passRate}. passRate = passed / (passed + failed) * 100, rounded to 1 decimal.",
  hint:"reduce / un loop con contadores. Cuidado con la división entre 0.",
  follow:"How would you also return the 3 slowest tests?",
  js:{fn:"summarize", starter:"function summarize(results) {\n  // your code\n}\n\nconst run = [\n  { name: 'login', status: 'passed', duration: 1200 },\n  { name: 'cart', status: 'failed', duration: 3400 },\n  { name: 'search', status: 'passed', duration: 800 },\n  { name: 'export', status: 'skipped', duration: 0 },\n];\nconsole.log(summarize(run));",
      prelude:"const RUN=[{name:'login',status:'passed',duration:1200},{name:'cart',status:'failed',duration:3400},{name:'search',status:'passed',duration:800},{name:'export',status:'skipped',duration:0}];",
      tests:[["summarize(RUN)","{total:4,passed:2,failed:1,skipped:1,passRate:66.7}"],["summarize([])","{total:0,passed:0,failed:0,skipped:0,passRate:0}"],["summarize([{name:'a',status:'skipped',duration:0}])","{total:1,passed:0,failed:0,skipped:1,passRate:0}"]]},
  ts:{starter:"type Status = 'passed' | 'failed' | 'skipped';\ninterface TestResult { name: string; status: Status; duration: number }\ninterface Summary { total: number; passed: number; failed: number; skipped: number; passRate: number }\n\nfunction summarize(results: TestResult[]): Summary {\n  // your code\n}\n\nconsole.log(summarize([\n  { name: 'login', status: 'passed', duration: 1200 },\n  { name: 'cart', status: 'failed', duration: 3400 },\n]));",
      solution:"function summarize(results: TestResult[]): Summary {\n  const s = { total: results.length, passed: 0, failed: 0, skipped: 0, passRate: 0 };\n  for (const r of results) s[r.status]++;\n  const executed = s.passed + s.failed;\n  s.passRate = executed ? Math.round((s.passed / executed) * 1000) / 10 : 0;\n  return s;\n}"},
  python:{starter:"def summarize(results):\n    # results: list of dicts {'name', 'status', 'duration'}\n    pass\n\nrun = [\n    {'name': 'login', 'status': 'passed', 'duration': 1200},\n    {'name': 'cart', 'status': 'failed', 'duration': 3400},\n]\nprint(summarize(run))",
      prelude:"RUN=[{'name':'login','status':'passed','duration':1200},{'name':'cart','status':'failed','duration':3400},{'name':'search','status':'passed','duration':800},{'name':'export','status':'skipped','duration':0}]",
      tests:[["summarize(RUN)","{'total':4,'passed':2,'failed':1,'skipped':1,'passRate':66.7}"],["summarize([])","{'total':0,'passed':0,'failed':0,'skipped':0,'passRate':0}"]],
      solution:"def summarize(results):\n    s = {'total': len(results), 'passed': 0, 'failed': 0, 'skipped': 0}\n    for r in results:\n        s[r['status']] += 1\n    executed = s['passed'] + s['failed']\n    s['passRate'] = round(s['passed'] / executed * 100, 1) if executed else 0\n    return s"},
  java:{starter:"import java.util.*;\nimport java.util.stream.*;\n\npublic class Main {\n    record TestResult(String name, String status, long duration) {}\n\n    public static Map<String, Object> summarize(List<TestResult> results) {\n        // your code\n        return new LinkedHashMap<>();\n    }\n\n    public static void main(String[] args) {\n        List<TestResult> run = List.of(\n            new TestResult(\"login\", \"passed\", 1200),\n            new TestResult(\"cart\", \"failed\", 3400),\n            new TestResult(\"search\", \"passed\", 800),\n            new TestResult(\"export\", \"skipped\", 0));\n        System.out.println(summarize(run));\n    }\n}",
      solution:"public static Map<String, Object> summarize(List<TestResult> results) {\n    Map<String, Long> by = results.stream()\n        .collect(Collectors.groupingBy(TestResult::status, Collectors.counting()));\n    long p = by.getOrDefault(\"passed\", 0L), f = by.getOrDefault(\"failed\", 0L);\n    Map<String, Object> s = new LinkedHashMap<>();\n    s.put(\"total\", results.size());\n    s.put(\"passed\", p); s.put(\"failed\", f);\n    s.put(\"skipped\", by.getOrDefault(\"skipped\", 0L));\n    s.put(\"passRate\", p + f == 0 ? 0.0 : Math.round(p * 1000.0 / (p + f)) / 10.0);\n    return s;\n}",
      tests:[["new TreeMap<>(Main.summarize(List.of(new Main.TestResult(\"login\",\"passed\",1200), new Main.TestResult(\"cart\",\"failed\",3400), new Main.TestResult(\"search\",\"passed\",800), new Main.TestResult(\"export\",\"skipped\",0)))).toString()","\"{failed=1, passRate=66.7, passed=2, skipped=1, total=4}\""],["new TreeMap<>(Main.summarize(new ArrayList<Main.TestResult>())).toString()","\"{failed=0, passRate=0.0, passed=0, skipped=0, total=0}\""]]}},

 {id:"logs", tag:"coding", level:"Media", title:"Parsear logs de CI",
  es:"Cada línea tiene el formato \"LEVEL [module] message\". Devuelve cuántos ERROR hay por módulo.",
  en:"Each log line looks like \"LEVEL [module] message\". Return the number of ERROR lines per module.",
  hint:"Regex: ^(\\w+) \\[(.+?)\\]. Solo cuenta si LEVEL === 'ERROR'.",
  follow:"How would you make this robust to malformed lines?",
  js:{fn:"errorsByModule", starter:"function errorsByModule(lines) {\n  // your code\n}\n\nconsole.log(errorsByModule([\n  'INFO [auth] user logged in',\n  'ERROR [cart] timeout after 30000ms',\n  'ERROR [cart] element not found',\n  'WARN [search] slow response',\n  'ERROR [auth] 401 Unauthorized',\n]));",
      prelude:"const LINES=['INFO [auth] user logged in','ERROR [cart] timeout after 30000ms','ERROR [cart] element not found','WARN [search] slow response','ERROR [auth] 401 Unauthorized','garbage line'];",
      tests:[["errorsByModule(LINES)","{cart:2,auth:1}"],["errorsByModule([])","{}"],["errorsByModule(['INFO [x] ok'])","{}"]]},
  ts:{starter:"function errorsByModule(lines: string[]): Record<string, number> {\n  // your code\n}\n\nconsole.log(errorsByModule(['ERROR [cart] timeout', 'INFO [auth] ok']));",
      solution:"function errorsByModule(lines: string[]): Record<string, number> {\n  const out: Record<string, number> = {};\n  for (const line of lines) {\n    const m = line.match(/^(\\w+) \\[(.+?)\\]/);\n    if (m && m[1] === 'ERROR') out[m[2]] = (out[m[2]] ?? 0) + 1;\n  }\n  return out;\n}"},
  python:{starter:"import re\n\ndef errors_by_module(lines):\n    # your code\n    pass\n\nprint(errors_by_module(['ERROR [cart] timeout', 'INFO [auth] ok']))",
      prelude:"LINES=['INFO [auth] user logged in','ERROR [cart] timeout after 30000ms','ERROR [cart] element not found','WARN [search] slow response','ERROR [auth] 401 Unauthorized','garbage line']",
      tests:[["errors_by_module(LINES)","{'cart':2,'auth':1}"],["errors_by_module([])","{}"]],
      solution:"import re\n\ndef errors_by_module(lines):\n    out = {}\n    for line in lines:\n        m = re.match(r'^(\\w+) \\[(.+?)\\]', line)\n        if m and m.group(1) == 'ERROR':\n            out[m.group(2)] = out.get(m.group(2), 0) + 1\n    return out"},
  java:{starter:"import java.util.*;\nimport java.util.regex.*;\n\npublic class Main {\n    public static Map<String, Integer> errorsByModule(List<String> lines) {\n        // your code\n        return new HashMap<>();\n    }\n\n    public static void main(String[] args) {\n        System.out.println(errorsByModule(List.of(\n            \"ERROR [cart] timeout\", \"INFO [auth] ok\", \"ERROR [cart] 500\")));\n    }\n}",
      solution:"private static final Pattern P = Pattern.compile(\"^(\\\\w+) \\\\[(.+?)\\\\]\");\npublic static Map<String, Integer> errorsByModule(List<String> lines) {\n    Map<String, Integer> out = new HashMap<>();\n    for (String line : lines) {\n        Matcher m = P.matcher(line);\n        if (m.find() && m.group(1).equals(\"ERROR\")) out.merge(m.group(2), 1, Integer::sum);\n    }\n    return out;\n}",
      tests:[["new TreeMap<>(Main.errorsByModule(List.of(\"INFO [auth] user logged in\",\"ERROR [cart] timeout after 30000ms\",\"ERROR [cart] element not found\",\"WARN [search] slow response\",\"ERROR [auth] 401 Unauthorized\",\"garbage line\"))).toString()","\"{auth=1, cart=2}\""],["new TreeMap<>(Main.errorsByModule(new ArrayList<String>())).toString()","\"{}\""],["new TreeMap<>(Main.errorsByModule(List.of(\"INFO [x] ok\"))).toString()","\"{}\""]]}},

 {id:"retry", tag:"coding", level:"Media", title:"Retry asíncrono",
  es:"Implementa retry(fn, attempts): ejecuta fn (async) hasta que tenga éxito o se agoten los intentos; si todos fallan, lanza el último error. Helper disponible en los tests: flaky(n) falla n veces y luego devuelve 'ok'.",
  en:"Implement retry(fn, attempts) that awaits fn until it succeeds or attempts run out, then rethrows the last error.",
  hint:"for + try/catch + await. Guarda el último error.",
  follow:"Why are blind retries dangerous in a test framework? When are they acceptable?",
  js:{fn:"retry", starter:"async function retry(fn, attempts = 3) {\n  // your code\n}\n\n// try it\nlet calls = 0;\nretry(async () => { if (++calls < 3) throw new Error('boom'); return 'ok'; }, 3)\n  .then(r => console.log(r, 'after', calls, 'calls'));",
      prelude:"function flaky(n){let c=0;return async()=>{if(c++<n)throw new Error('fail '+c);return 'ok';};}",
      tests:[["await retry(flaky(2),3)","'ok'"],["await retry(flaky(0),1)","'ok'"],["await retry(flaky(5),2).then(()=>'no error',e=>e.message)","'fail 2'"]]},
  ts:{starter:"async function retry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {\n  // your code\n}\n",
      solution:"async function retry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {\n  let last: unknown;\n  for (let i = 0; i < attempts; i++) {\n    try { return await fn(); } catch (e) { last = e; }\n  }\n  throw last;\n}"},
  python:{starter:"def retry(fn, attempts=3):\n    # call fn() until it succeeds; re-raise the last exception\n    pass\n\ndef make_flaky(n):\n    state = {'calls': 0}\n    def fn():\n        state['calls'] += 1\n        if state['calls'] <= n:\n            raise ValueError('fail ' + str(state['calls']))\n        return 'ok'\n    return fn\n\nprint(retry(make_flaky(2), 3))",
      prelude:"def flaky(n):\n    st={'c':0}\n    def f():\n        st['c']+=1\n        if st['c']<=n:\n            raise ValueError('fail '+str(st['c']))\n        return 'ok'\n    return f\ndef err_msg(fn):\n    try:\n        fn()\n        return 'no error'\n    except Exception as e:\n        return str(e)",
      tests:[["retry(flaky(2),3)","'ok'"],["err_msg(lambda: retry(flaky(5),2))","'fail 2'"]],
      solution:"def retry(fn, attempts=3):\n    last = None\n    for _ in range(attempts):\n        try:\n            return fn()\n        except Exception as e:\n            last = e\n    raise last"},
  java:{starter:"import java.util.function.Supplier;\n\npublic class Main {\n    public static <T> T retry(Supplier<T> fn, int attempts) {\n        // your code\n        return null;\n    }\n\n    public static void main(String[] args) {\n        int[] calls = {0};\n        String r = retry(() -> {\n            if (++calls[0] < 3) throw new RuntimeException(\"boom\");\n            return \"ok\";\n        }, 3);\n        System.out.println(r + \" after \" + calls[0] + \" calls\");\n    }\n}",
      solution:"public static <T> T retry(Supplier<T> fn, int attempts) {\n    RuntimeException last = null;\n    for (int i = 0; i < attempts; i++) {\n        try { return fn.get(); }\n        catch (RuntimeException e) { last = e; }\n    }\n    throw last;\n}",
      tests:[["Main.retry(new java.util.function.Supplier<String>(){int c=0; public String get(){ if(++c<3) throw new RuntimeException(\"boom\"); return \"ok\"; }}, 3)","\"ok\""],["Main.retry(new java.util.function.Supplier<String>(){public String get(){ return \"ok\"; }}, 1)","\"ok\""]]}},

 {id:"fizz", tag:"coding", level:"Warm-up", title:"FizzBuzz",
  es:"Devuelve una lista de 1 a n: 'Fizz' si es múltiplo de 3, 'Buzz' de 5, 'FizzBuzz' de ambos; si no, el número como string.",
  en:"Return a list from 1 to n with Fizz/Buzz/FizzBuzz rules; other numbers as strings.",
  hint:"Comprueba primero el múltiplo de 15.",
  follow:"How would you make the rules configurable (Open/Closed principle)?",
  js:{fn:"fizzBuzz", starter:"function fizzBuzz(n) {\n  // your code\n}\n\nconsole.log(fizzBuzz(15));",
      tests:[["fizzBuzz(5)","['1','2','Fizz','4','Buzz']"],["fizzBuzz(15)[14]","'FizzBuzz'"],["fizzBuzz(0)","[]"]]},
  ts:{starter:"function fizzBuzz(n: number): string[] {\n  // your code\n}\n\nconsole.log(fizzBuzz(15));",
      solution:"function fizzBuzz(n: number): string[] {\n  return Array.from({ length: n }, (_, i) => {\n    const k = i + 1;\n    return k % 15 === 0 ? 'FizzBuzz' : k % 3 === 0 ? 'Fizz' : k % 5 === 0 ? 'Buzz' : String(k);\n  });\n}"},
  python:{starter:"def fizz_buzz(n):\n    # your code\n    pass\n\nprint(fizz_buzz(15))",
      tests:[["fizz_buzz(5)","['1','2','Fizz','4','Buzz']"],["fizz_buzz(15)[14]","'FizzBuzz'"],["fizz_buzz(0)","[]"]],
      solution:"def fizz_buzz(n):\n    out = []\n    for k in range(1, n + 1):\n        s = ('Fizz' if k % 3 == 0 else '') + ('Buzz' if k % 5 == 0 else '')\n        out.append(s or str(k))\n    return out"},
  java:{starter:"import java.util.*;\n\npublic class Main {\n    public static List<String> fizzBuzz(int n) {\n        // your code\n        return new ArrayList<>();\n    }\n\n    public static void main(String[] args) {\n        System.out.println(fizzBuzz(15));\n    }\n}",
      solution:"public static List<String> fizzBuzz(int n) {\n    List<String> out = new ArrayList<>();\n    for (int k = 1; k <= n; k++) {\n        if (k % 15 == 0) out.add(\"FizzBuzz\");\n        else if (k % 3 == 0) out.add(\"Fizz\");\n        else if (k % 5 == 0) out.add(\"Buzz\");\n        else out.add(String.valueOf(k));\n    }\n    return out;\n}",
      tests:[["Main.fizzBuzz(5)","\"[1, 2, Fizz, 4, Buzz]\""],["Main.fizzBuzz(15).get(14)","\"FizzBuzz\""],["Main.fizzBuzz(0)","\"[]\""]]}},

 {id:"groupBy", tag:"coding", level:"Media", title:"Agrupar tests por suite (map/reduce)",
  es:"Recibes [{suite, name}]. Devuelve un objeto suite → lista de nombres, conservando el orden. Usa reduce en JS/TS.",
  en:"Group test cases by suite: return an object mapping suite to the list of test names.",
  hint:"reduce con acumulador {} y (acc[s] ??= []).push(name). En Java: Collectors.groupingBy.",
  follow:"Write the Java version with Streams and explain groupingBy + mapping.",
  js:{fn:"groupBySuite", starter:"function groupBySuite(cases) {\n  // your code\n}\n\nconsole.log(groupBySuite([\n  { suite: 'auth', name: 'login ok' },\n  { suite: 'cart', name: 'add item' },\n  { suite: 'auth', name: 'logout' },\n]));",
      tests:[["groupBySuite([{suite:'auth',name:'login ok'},{suite:'cart',name:'add item'},{suite:'auth',name:'logout'}])","{auth:['login ok','logout'],cart:['add item']}"],["groupBySuite([])","{}"]]},
  ts:{starter:"interface TestCase { suite: string; name: string }\n\nfunction groupBySuite(cases: TestCase[]): Record<string, string[]> {\n  // your code\n}\n",
      solution:"function groupBySuite(cases: TestCase[]): Record<string, string[]> {\n  return cases.reduce<Record<string, string[]>>((acc, { suite, name }) => {\n    (acc[suite] ??= []).push(name);\n    return acc;\n  }, {});\n}"},
  python:{starter:"def group_by_suite(cases):\n    # your code\n    pass\n",
      tests:[["group_by_suite([{'suite':'auth','name':'login ok'},{'suite':'cart','name':'add item'},{'suite':'auth','name':'logout'}])","{'auth':['login ok','logout'],'cart':['add item']}"]],
      solution:"def group_by_suite(cases):\n    out = {}\n    for c in cases:\n        out.setdefault(c['suite'], []).append(c['name'])\n    return out"},
  java:{starter:"import java.util.*;\nimport java.util.stream.*;\n\npublic class Main {\n    record TestCase(String suite, String name) {}\n\n    public static Map<String, List<String>> groupBySuite(List<TestCase> cases) {\n        // your code using Streams\n        return new HashMap<>();\n    }\n\n    public static void main(String[] args) {\n        System.out.println(groupBySuite(List.of(\n            new TestCase(\"auth\", \"login ok\"),\n            new TestCase(\"cart\", \"add item\"),\n            new TestCase(\"auth\", \"logout\"))));\n    }\n}",
      solution:"public static Map<String, List<String>> groupBySuite(List<TestCase> cases) {\n    return cases.stream().collect(Collectors.groupingBy(\n        TestCase::suite, LinkedHashMap::new,\n        Collectors.mapping(TestCase::name, Collectors.toList())));\n}",
      tests:[["new TreeMap<>(Main.groupBySuite(List.of(new Main.TestCase(\"auth\",\"login ok\"), new Main.TestCase(\"cart\",\"add item\"), new Main.TestCase(\"auth\",\"logout\")))).toString()","\"{auth=[login ok, logout], cart=[add item]}\""],["new TreeMap<>(Main.groupBySuite(new ArrayList<Main.TestCase>())).toString()","\"{}\""]]}},

 {id:"equalsHash", tag:"coding", level:"Media", title:"equals() y hashCode() en un User", only:["java"], review:true,
  es:"Crea la clase User(email, name). Dos usuarios son iguales si tienen el mismo email ignorando mayúsculas. Demuestra que un HashSet no guarda duplicados.",
  en:"Implement a User class where two users are equal if their emails match case-insensitively. Show that a HashSet de-duplicates them.",
  hint:"Normaliza el email en el constructor o en equals y hashCode, de forma coherente.",
  follow:"What happens if you override equals() but not hashCode()?",
  java:{starter:"import java.util.*;\n\npublic class Main {\n    static class User {\n        private final String email;\n        private final String name;\n\n        User(String email, String name) {\n            this.email = email;\n            this.name = name;\n        }\n\n        // override equals and hashCode\n    }\n\n    public static void main(String[] args) {\n        Set<User> users = new HashSet<>();\n        users.add(new User(\"QA@example.com\", \"Maria\"));\n        users.add(new User(\"qa@example.com\", \"María P.\"));\n        System.out.println(users.size()); // expected: 1\n    }\n}",
      solution:"@Override public boolean equals(Object o) {\n    if (this == o) return true;\n    if (!(o instanceof User other)) return false;\n    return email.equalsIgnoreCase(other.email);\n}\n@Override public int hashCode() {\n    return email.toLowerCase(Locale.ROOT).hashCode();\n}"}},

 {id:"pyclass", tag:"python", level:"Media", title:"Clase TestRun con excepciones", only:["python"],
  es:"Crea la clase TestRun con add(name, status). status solo puede ser 'passed', 'failed' o 'skipped'; si no, lanza ValueError. Añade el método failed_tests() que devuelve los nombres fallidos en orden.",
  en:"Create a TestRun class with add(name, status) that raises ValueError for invalid statuses, and failed_tests() returning failed test names.",
  hint:"Guarda una lista de tuplas. Valida con un set de estados permitidos.",
  follow:"How would you make TestRun iterable? (__iter__) What about __len__?",
  python:{starter:"class TestRun:\n    VALID = {'passed', 'failed', 'skipped'}\n\n    def __init__(self):\n        pass\n\n    def add(self, name, status):\n        pass\n\n    def failed_tests(self):\n        pass\n\n\nrun = TestRun()\nrun.add('login', 'passed')\nrun.add('cart', 'failed')\nprint(run.failed_tests())",
      prelude:"def build():\n    r=TestRun()\n    r.add('login','passed')\n    r.add('cart','failed')\n    r.add('pay','failed')\n    return r\ndef bad():\n    try:\n        TestRun().add('x','broken')\n        return 'no error'\n    except ValueError:\n        return 'ValueError'",
      tests:[["build().failed_tests()","['cart','pay']"],["bad()","'ValueError'"],["TestRun().failed_tests()","[]"]],
      solution:"class TestRun:\n    VALID = {'passed', 'failed', 'skipped'}\n\n    def __init__(self):\n        self._results = []\n\n    def add(self, name, status):\n        if status not in self.VALID:\n            raise ValueError(f'Invalid status: {status}')\n        self._results.append((name, status))\n\n    def failed_tests(self):\n        return [n for n, s in self._results if s == 'failed']"}},

 // ---------- Playwright (TypeScript, reviewed) ----------
 {id:"pw-login", tag:"playwright", level:"Core", title:"Test de login con locators accesibles", only:["ts"], review:true,
  es:"Escribe dos tests: login exitoso (redirige a /dashboard y muestra 'Welcome') y login con password incorrecto (muestra alerta de error). Usa getByRole/getByLabel y web-first assertions.",
  en:"Write a happy-path and a negative login test using role/label locators and web-first assertions.",
  hint:"expect(page).toHaveURL(/dashboard/), expect(locator).toBeVisible(). Nada de waitForTimeout.",
  follow:"Why are web-first assertions better than expect(await locator.isVisible()).toBe(true)?",
  ts:{starter:"import { test, expect } from '@playwright/test';\n\ntest.describe('Login', () => {\n  test.beforeEach(async ({ page }) => {\n    await page.goto('/login');\n  });\n\n  test('valid credentials go to dashboard', async ({ page }) => {\n    // your code\n  });\n\n  test('wrong password shows an error', async ({ page }) => {\n    // your code\n  });\n});\n",
      solution:"test('valid credentials go to dashboard', async ({ page }) => {\n  await page.getByLabel('Email').fill('qa@test.com');\n  await page.getByLabel('Password').fill(process.env.QA_PASSWORD!);\n  await page.getByRole('button', { name: 'Sign in' }).click();\n  await expect(page).toHaveURL(/\\/dashboard/);\n  await expect(page.getByRole('heading', { name: /welcome/i })).toBeVisible();\n});\n\ntest('wrong password shows an error', async ({ page }) => {\n  await page.getByLabel('Email').fill('qa@test.com');\n  await page.getByLabel('Password').fill('wrong');\n  await page.getByRole('button', { name: 'Sign in' }).click();\n  await expect(page.getByRole('alert')).toContainText(/invalid credentials/i);\n  await expect(page).toHaveURL(/\\/login/);\n});"}},

 {id:"pw-pom", tag:"playwright", level:"Framework", title:"Page Object + fixture", only:["ts"], review:true,
  es:"Crea LoginPage (locators como propiedades readonly, método login) y una fixture loginPage con test.extend. Reescribe el test de login usándola.",
  en:"Build a LoginPage object and expose it as a custom fixture with test.extend; use it in a test.",
  hint:"Los locators se definen en el constructor; las acciones son async; los asserts quedan en el test.",
  follow:"Where do you put assertions: Page Object or test? Defend your choice.",
  ts:{starter:"import { test as base, expect, Page, Locator } from '@playwright/test';\n\nexport class LoginPage {\n  // locators\n\n  constructor(private readonly page: Page) {\n    // init locators\n  }\n\n  async goto() {}\n\n  async login(email: string, password: string) {}\n}\n\ntype Fixtures = { loginPage: LoginPage };\n\nexport const test = base.extend<Fixtures>({\n  // loginPage fixture\n});\n\ntest('user logs in', async ({ loginPage, page }) => {\n  // your code\n});\n",
      solution:"export class LoginPage {\n  readonly email: Locator;\n  readonly password: Locator;\n  readonly submit: Locator;\n  readonly error: Locator;\n\n  constructor(private readonly page: Page) {\n    this.email = page.getByLabel('Email');\n    this.password = page.getByLabel('Password');\n    this.submit = page.getByRole('button', { name: 'Sign in' });\n    this.error = page.getByRole('alert');\n  }\n  async goto() { await this.page.goto('/login'); }\n  async login(email: string, password: string) {\n    await this.email.fill(email);\n    await this.password.fill(password);\n    await this.submit.click();\n  }\n}\n\nexport const test = base.extend<Fixtures>({\n  loginPage: async ({ page }, use) => {\n    const lp = new LoginPage(page);\n    await lp.goto();\n    await use(lp);\n  },\n});\n\ntest('user logs in', async ({ loginPage, page }) => {\n  await loginPage.login('qa@test.com', 'Secret123!');\n  await expect(page).toHaveURL(/dashboard/);\n});"}},

 {id:"pw-mock", tag:"playwright", level:"Avanzado", title:"Mock de red: lista vacía y error 500", only:["ts"], review:true,
  es:"Con page.route, mockea GET /api/products: un test con lista vacía (muestra 'No products yet') y otro con status 500 (muestra 'Something went wrong' y botón Retry).",
  en:"Use page.route to mock the products API: empty list state and a 500 error state.",
  hint:"Registra el route ANTES de page.goto. route.fulfill({ status, json }).",
  follow:"When would you mock the backend and when would you hit the real API?",
  ts:{starter:"import { test, expect } from '@playwright/test';\n\ntest('shows empty state', async ({ page }) => {\n  // your code\n});\n\ntest('shows error state on 500', async ({ page }) => {\n  // your code\n});\n",
      solution:"test('shows empty state', async ({ page }) => {\n  await page.route('**/api/products', r => r.fulfill({ status: 200, json: [] }));\n  await page.goto('/products');\n  await expect(page.getByText('No products yet')).toBeVisible();\n});\n\ntest('shows error state on 500', async ({ page }) => {\n  await page.route('**/api/products', r => r.fulfill({ status: 500, json: { error: 'boom' } }));\n  await page.goto('/products');\n  await expect(page.getByText('Something went wrong')).toBeVisible();\n  await expect(page.getByRole('button', { name: 'Retry' })).toBeEnabled();\n});"}},

 {id:"pw-api", tag:"playwright", level:"API", title:"Crear datos por API y validar en UI", only:["ts"], review:true,
  es:"Usa el fixture request para crear un pedido con POST /api/orders (valida 201 y el id), luego abre /orders/{id} en la UI y verifica el estado 'Pending'. Limpia con DELETE al final.",
  en:"Create test data through the API with APIRequestContext, verify it in the UI and clean up afterwards.",
  hint:"const res = await request.post(url, { data }); expect(res.status()).toBe(201); const body = await res.json();",
  follow:"Why is seeding data via API better than via UI? How do you guarantee cleanup if the test fails?",
  ts:{starter:"import { test, expect } from '@playwright/test';\n\ntest('order created via API appears as Pending', async ({ page, request }) => {\n  // 1. create via API\n  // 2. verify in UI\n  // 3. cleanup\n});\n",
      solution:"test('order created via API appears as Pending', async ({ page, request }) => {\n  const res = await request.post('/api/orders', { data: { sku: 'SKU-1', qty: 2 } });\n  expect(res.status()).toBe(201);\n  const { id } = await res.json();\n  try {\n    await page.goto('/orders/' + id);\n    await expect(page.getByTestId('order-status')).toHaveText('Pending');\n  } finally {\n    await request.delete('/api/orders/' + id);\n  }\n});\n// Mejor aún: una fixture 'order' que crea en setup y borra en teardown."}},

 {id:"pw-config", tag:"playwright", level:"Arquitectura", title:"playwright.config.ts para CI", only:["ts"], review:true,
  es:"Escribe un config con: baseURL desde env, retries 2 solo en CI, workers 4 en CI, trace 'on-first-retry', screenshot solo en fallo, reporters html + junit, y proyectos setup → chromium y firefox con storageState.",
  en:"Write a playwright.config.ts suitable for CI: env-based baseURL, CI retries, traces, reporters and setup project dependencies.",
  hint:"defineConfig({...}); process.env.CI; projects con dependencies: ['setup'].",
  follow:"Why trace 'on-first-retry' instead of 'on'?",
  ts:{starter:"import { defineConfig, devices } from '@playwright/test';\n\nexport default defineConfig({\n  // your config\n});\n",
      solution:"export default defineConfig({\n  testDir: './tests',\n  fullyParallel: true,\n  forbidOnly: !!process.env.CI,\n  retries: process.env.CI ? 2 : 0,\n  workers: process.env.CI ? 4 : undefined,\n  reporter: [['html', { open: 'never' }], ['junit', { outputFile: 'results/junit.xml' }]],\n  use: {\n    baseURL: process.env.BASE_URL ?? 'http://localhost:3000',\n    trace: 'on-first-retry',\n    screenshot: 'only-on-failure',\n    video: 'retain-on-failure',\n  },\n  projects: [\n    { name: 'setup', testMatch: /.*\\.setup\\.ts/ },\n    { name: 'chromium', dependencies: ['setup'],\n      use: { ...devices['Desktop Chrome'], storageState: '.auth/user.json' } },\n    { name: 'firefox', dependencies: ['setup'],\n      use: { ...devices['Desktop Firefox'], storageState: '.auth/user.json' } },\n  ],\n});"}},

 {id:"pw-tabs", tag:"playwright", level:"Core", title:"Popups, iframes y descargas", only:["ts"], review:true,
  es:"Tres tests: (1) un link abre una pestaña nueva con /terms; (2) rellenar un campo dentro de un iframe #payment; (3) descargar un CSV y validar el nombre del archivo.",
  en:"Handle a new tab, an iframe and a file download in Playwright.",
  hint:"Promise.all / waitForEvent('popup') antes del click; page.frameLocator('#payment'); waitForEvent('download').",
  follow:"Why must you start waiting for the popup before clicking?",
  ts:{starter:"import { test, expect } from '@playwright/test';\n\ntest('terms opens in a new tab', async ({ page }) => {});\n\ntest('fills card number inside iframe', async ({ page }) => {});\n\ntest('downloads report as CSV', async ({ page }) => {});\n",
      solution:"test('terms opens in a new tab', async ({ page }) => {\n  const popupPromise = page.waitForEvent('popup');\n  await page.getByRole('link', { name: 'Terms' }).click();\n  const popup = await popupPromise;\n  await expect(popup).toHaveURL(/\\/terms/);\n});\n\ntest('fills card number inside iframe', async ({ page }) => {\n  const frame = page.frameLocator('#payment');\n  await frame.getByLabel('Card number').fill('4242424242424242');\n});\n\ntest('downloads report as CSV', async ({ page }) => {\n  const downloadPromise = page.waitForEvent('download');\n  await page.getByRole('button', { name: 'Export CSV' }).click();\n  const download = await downloadPromise;\n  expect(download.suggestedFilename()).toMatch(/\\.csv$/);\n});"}},

 // ---------- Selenium / Java ----------
 {id:"se-factory", tag:"selenium", level:"Framework", title:"DriverFactory thread-safe", only:["java"], review:true,
  es:"Implementa DriverFactory con ThreadLocal<WebDriver>, init(browser) para chrome/firefox (headless si CI=true), get() y quit() que libere el ThreadLocal.",
  en:"Implement a thread-safe DriverFactory using ThreadLocal for parallel TestNG execution.",
  hint:"ChromeOptions().addArguments(\"--headless=new\"). DRIVER.remove() en quit.",
  follow:"What breaks if you use a static WebDriver with parallel=\"methods\"?",
  java:{starter:"import org.openqa.selenium.WebDriver;\nimport org.openqa.selenium.chrome.*;\nimport org.openqa.selenium.firefox.*;\n\npublic final class DriverFactory {\n\n    private DriverFactory() {}\n\n    public static void init(String browser) {\n        // your code\n    }\n\n    public static WebDriver get() {\n        return null;\n    }\n\n    public static void quit() {\n        // your code\n    }\n}",
      solution:"private static final ThreadLocal<WebDriver> DRIVER = new ThreadLocal<>();\nprivate static final boolean CI = Boolean.parseBoolean(System.getenv().getOrDefault(\"CI\", \"false\"));\n\npublic static void init(String browser) {\n    WebDriver d = switch (browser.toLowerCase()) {\n        case \"firefox\" -> {\n            FirefoxOptions o = new FirefoxOptions();\n            if (CI) o.addArguments(\"-headless\");\n            yield new FirefoxDriver(o);\n        }\n        default -> {\n            ChromeOptions o = new ChromeOptions();\n            if (CI) o.addArguments(\"--headless=new\");\n            yield new ChromeDriver(o);\n        }\n    };\n    DRIVER.set(d);\n}\npublic static WebDriver get() { return DRIVER.get(); }\npublic static void quit() {\n    WebDriver d = DRIVER.get();\n    if (d != null) { d.quit(); DRIVER.remove(); }\n}"}},

 {id:"se-pom", tag:"selenium", level:"Framework", title:"BasePage + LoginPage", only:["java"], review:true,
  es:"Crea BasePage con WebDriverWait y helpers click(By) y type(By, text) con explicit waits. Luego LoginPage extends BasePage con login(user, pass) que devuelve DashboardPage.",
  en:"Create a BasePage with explicit-wait helpers and a fluent LoginPage that returns the next page object.",
  hint:"wait.until(ExpectedConditions.elementToBeClickable(by)).click();",
  follow:"Why return the next Page Object from an action (fluent POM)?",
  java:{starter:"import org.openqa.selenium.*;\nimport org.openqa.selenium.support.ui.*;\nimport java.time.Duration;\n\npublic abstract class BasePage {\n    protected final WebDriver driver;\n    protected final WebDriverWait wait;\n\n    protected BasePage(WebDriver driver) {\n        // your code\n    }\n\n    protected void click(By locator) {}\n    protected void type(By locator, String text) {}\n}\n\nclass LoginPage extends BasePage {\n    // locators\n\n    LoginPage(WebDriver driver) { super(driver); }\n\n    public DashboardPage login(String user, String pass) {\n        return null;\n    }\n}",
      solution:"protected BasePage(WebDriver driver) {\n    this.driver = driver;\n    this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));\n}\nprotected void click(By locator) {\n    wait.until(ExpectedConditions.elementToBeClickable(locator)).click();\n}\nprotected void type(By locator, String text) {\n    WebElement el = wait.until(ExpectedConditions.visibilityOfElementLocated(locator));\n    el.clear();\n    el.sendKeys(text);\n}\n\n// LoginPage\nprivate final By email = By.id(\"email\");\nprivate final By password = By.id(\"password\");\nprivate final By submit = By.cssSelector(\"button[type='submit']\");\n\npublic DashboardPage login(String user, String pass) {\n    type(email, user);\n    type(password, pass);\n    click(submit);\n    return new DashboardPage(driver);\n}"}},

 {id:"se-dp", tag:"selenium", level:"TestNG", title:"TestNG: DataProvider, groups y retry", only:["java"], review:true,
  es:"Escribe una clase de test con @BeforeMethod/@AfterMethod usando DriverFactory, un @DataProvider con 3 casos de búsqueda, groups = {\"regression\"} y un IRetryAnalyzer que reintente 1 vez.",
  en:"Write a TestNG test class with a data provider, groups, lifecycle hooks and a retry analyzer.",
  hint:"implements IRetryAnalyzer { public boolean retry(ITestResult r) { ... } }",
  follow:"Why should retries be tracked and reported instead of silently hiding failures?",
  java:{starter:"import org.testng.*;\nimport org.testng.annotations.*;\n\npublic class SearchTest {\n\n    // @BeforeMethod / @AfterMethod\n\n    // @DataProvider\n\n    // @Test(dataProvider = ..., groups = ..., retryAnalyzer = ...)\n}\n\nclass RetryOnce implements IRetryAnalyzer {\n    // your code\n}",
      solution:"public class SearchTest {\n    @BeforeMethod(alwaysRun = true)\n    public void setUp() { DriverFactory.init(System.getProperty(\"browser\", \"chrome\")); }\n\n    @AfterMethod(alwaysRun = true)\n    public void tearDown() { DriverFactory.quit(); }\n\n    @DataProvider(name = \"queries\", parallel = true)\n    public Object[][] queries() {\n        return new Object[][] { {\"laptop\", true}, {\"phone\", true}, {\"zzzz\", false} };\n    }\n\n    @Test(dataProvider = \"queries\", groups = {\"regression\"}, retryAnalyzer = RetryOnce.class)\n    public void search(String q, boolean hasResults) {\n        SearchPage page = new SearchPage(DriverFactory.get()).open().search(q);\n        Assert.assertEquals(page.hasResults(), hasResults);\n    }\n}\n\nclass RetryOnce implements IRetryAnalyzer {\n    private int count = 0;\n    public boolean retry(ITestResult result) { return count++ < 1; }\n}"}},

 {id:"se-restassured", tag:"selenium", level:"API", title:"REST Assured: crear y validar usuario", only:["java"], review:true,
  es:"Con REST Assured: POST /users con JSON, valida 201, que el body tenga id y email correcto, luego GET /users/{id} y valida 200 y el nombre.",
  en:"Use REST Assured to create a user, validate status and body, then fetch it by id.",
  hint:"given().contentType(JSON).body(map).when().post(\"/users\").then().statusCode(201).extract().path(\"id\")",
  follow:"How would you validate the response against a JSON schema?",
  java:{starter:"import static io.restassured.RestAssured.*;\nimport static org.hamcrest.Matchers.*;\nimport io.restassured.http.ContentType;\nimport org.testng.annotations.Test;\nimport java.util.Map;\n\npublic class UserApiTest {\n\n    @Test\n    public void createAndFetchUser() {\n        // your code\n    }\n}",
      solution:"@Test\npublic void createAndFetchUser() {\n    Map<String, String> body = Map.of(\"name\", \"Maria\", \"email\", \"maria@test.com\");\n    String id = given().baseUri(BASE_URL).contentType(ContentType.JSON).body(body)\n        .when().post(\"/users\")\n        .then().statusCode(201)\n            .body(\"id\", notNullValue())\n            .body(\"email\", equalTo(\"maria@test.com\"))\n        .extract().path(\"id\");\n\n    given().baseUri(BASE_URL)\n        .when().get(\"/users/{id}\", id)\n        .then().statusCode(200).body(\"name\", equalTo(\"Maria\"));\n}"}},

 // ---------- Pytest (reviewed) ----------
 {id:"py-fixture", tag:"python", level:"Pytest", title:"conftest.py: fixtures y parametrize", only:["python"], review:true,
  es:"Escribe un conftest.py con una fixture api_client de scope session (yield + cierre) y un test parametrizado que valide GET /users/{id} para 3 ids con su status esperado (200, 200, 404). Marca el test como @pytest.mark.smoke.",
  en:"Write a session-scoped API client fixture in conftest.py and a parametrized smoke test using it.",
  hint:"requests.Session() dentro de la fixture; @pytest.mark.parametrize(\"user_id, status\", [...]).",
  follow:"Explain fixture scopes and when session scope is dangerous.",
  python:{starter:"# conftest.py\nimport pytest\nimport requests\n\nBASE_URL = 'https://api.example.com'\n\n# fixture here\n\n\n# test_users.py\n# parametrized test here\n",
      solution:"# conftest.py\n@pytest.fixture(scope='session')\ndef api_client():\n    s = requests.Session()\n    s.headers.update({'Authorization': 'Bearer ' + os.environ['API_TOKEN']})\n    s.base_url = BASE_URL\n    yield s\n    s.close()\n\n# test_users.py\n@pytest.mark.smoke\n@pytest.mark.parametrize('user_id, status', [(1, 200), (2, 200), (999, 404)], ids=['u1', 'u2', 'missing'])\ndef test_get_user(api_client, user_id, status):\n    r = api_client.get(f'{api_client.base_url}/users/{user_id}', timeout=10)\n    assert r.status_code == status"}},

 {id:"py-pw", tag:"python", level:"Pytest", title:"pytest-playwright: búsqueda", only:["python"], review:true,
  es:"Con pytest-playwright (fixture page), escribe un test que busque 'laptop' y verifique que hay al menos un resultado y que el título contiene 'laptop'. Usa expect de playwright.sync_api.",
  en:"Write a pytest-playwright test using the page fixture and web-first assertions.",
  hint:"from playwright.sync_api import Page, expect; expect(page.get_by_role('listitem').first).to_be_visible()",
  follow:"How do you run it in parallel across browsers? (pytest -n auto --browser chromium --browser firefox)",
  python:{starter:"from playwright.sync_api import Page, expect\n\n\ndef test_search_laptop(page: Page):\n    # your code\n    pass\n",
      solution:"def test_search_laptop(page: Page):\n    page.goto('/')\n    page.get_by_role('searchbox', name='Search').fill('laptop')\n    page.keyboard.press('Enter')\n    results = page.get_by_role('listitem').filter(has_text='laptop')\n    expect(results.first).to_be_visible()\n    expect(page).to_have_title(re.compile('laptop', re.I))"}}
];

// ================= EXERCISE DOCS: examples (input → output), rules, deliverables =================
const EXDOC = {
  evens: {
    examples: [
      { in: 'nums = [1, 2, 3, 4, 5, 6]', out: '[2, 4, 6]', why: 'Solo se conservan los números divisibles entre 2, en el mismo orden.' },
      { in: 'nums = [-3, -2, 0, 7]', out: '[-2, 0]', why: 'Los negativos pares y el 0 también son pares.' },
      { in: 'nums = []', out: '[]', why: 'Array vacío → array vacío, sin error.' }
    ],
    rules: ['No modifiques el array original: después de llamar la función, nums debe seguir igual.', 'Mantén el orden en que aparecen.', 'Complejidad esperada: O(n).']
  },
  reverse: {
    examples: [
      { in: 's = "playwright"', out: '"thgirwyalp"' },
      { in: 's = "Ab C"', out: '"C bA"', why: 'Los espacios y las mayúsculas se mantienen, solo cambia el orden.' },
      { in: 's = ""', out: '""' }
    ],
    rules: ['Prohibido: reverse(), [::-1], reversed(), StringBuilder.reverse().', 'Recorre con un índice o con dos punteros.']
  },
  palindrome: {
    examples: [
      { in: 's = "A man, a plan, a canal: Panama"', out: 'true', why: 'Sin espacios ni signos queda "amanaplanacanalpanama", que se lee igual al revés.' },
      { in: 's = "race a car"', out: 'false', why: '"raceacar" al revés es "racaecar".' },
      { in: 's = ""', out: 'true', why: 'Un texto vacío se considera palíndromo.' }
    ],
    rules: ['Ignora mayúsculas/minúsculas.', 'Ignora todo lo que no sea letra o dígito (espacios, comas, dos puntos…).']
  },
  freq: {
    examples: [
      { in: 's = "hello world"', out: '{ h: 1, e: 1, l: 3, o: 2, w: 1, r: 1, d: 1 }', why: 'La "l" aparece 3 veces, la "o" 2 veces; el espacio no se cuenta.' },
      { in: 's = "aaa"', out: '{ a: 3 }' },
      { in: 's = ""', out: '{ }', why: 'Mapa vacío.' }
    ],
    rules: ['Distingue mayúsculas: "A" y "a" son caracteres distintos.', 'No cuentes los espacios.', 'El orden de las claves no importa para los tests.'],
    returns: { java: 'Map<Character, Integer>', python: 'dict', ts: 'Record<string, number>', js: 'objeto { carácter: cantidad }' }
  },
  dupes: {
    examples: [
      { in: 'nums = [4, 3, 2, 7, 8, 2, 3, 1, 3]', out: '[2, 3]', why: 'El 2 aparece 2 veces y el 3 aparece 3 veces. Cada uno se devuelve una sola vez.' },
      { in: 'nums = [10, -1, 10, -1, 5]', out: '[-1, 10]', why: 'Ordenado de menor a mayor.' },
      { in: 'nums = [1, 2, 3]', out: '[]' }
    ],
    rules: ['Cada duplicado aparece una sola vez en el resultado.', 'Resultado ordenado ascendentemente.']
  },
  firstUnique: {
    examples: [
      { in: 's = "swiss"', out: '"w"', why: 's aparece 3 veces, w 1 vez, i 1 vez. La primera con 1 aparición, leyendo de izquierda a derecha, es "w".' },
      { in: 's = "keyboard"', out: '"k"' },
      { in: 's = "aabb"', out: 'null  (None en Python)', why: 'Todos se repiten.' }
    ],
    rules: ['"Primero" se refiere a la posición en el string, no al orden alfabético.', 'Si no hay ninguno, devuelve null / None.']
  },
  twoSum: {
    examples: [
      { in: 'nums = [2, 7, 11, 15], target = 9', out: '[0, 1]', why: 'nums[0] + nums[1] = 2 + 7 = 9.' },
      { in: 'nums = [3, 2, 4], target = 6', out: '[1, 2]', why: '2 + 4 = 6. No vale usar el 3 dos veces.' },
      { in: 'nums = [1, 2], target = 10', out: '[]', why: 'Ningún par suma 10.' }
    ],
    rules: ['Devuelve índices (posiciones), no valores.', 'No puedes usar el mismo elemento dos veces.', 'Índice menor primero.', 'Objetivo: O(n) con un mapa.']
  },
  anagram: {
    examples: [
      { in: 'a = "Listen", b = "Silent"', out: 'true', why: 'Mismas letras, mismas cantidades.' },
      { in: 'a = "Dormitory", b = "Dirty room"', out: 'true', why: 'Se ignoran mayúsculas y espacios.' },
      { in: 'a = "aab", b = "ab"', out: 'false', why: 'La "a" aparece 2 veces en uno y 1 en el otro.' }
    ],
    rules: ['Ignora mayúsculas y espacios.', 'Las cantidades de cada letra deben coincidir exactamente.']
  },
  secondLargest: {
    examples: [
      { in: 'nums = [5, 1, 5, 3]', out: '3', why: 'Valores distintos: 5, 3, 1. El segundo mayor es 3 (el 5 repetido no cuenta dos veces).' },
      { in: 'nums = [-1, -5, -3]', out: '-3' },
      { in: 'nums = [7, 7, 7]', out: 'null  (None en Python)', why: 'Solo hay un valor distinto.' }
    ],
    rules: ['"Distinto" significa ignorar repeticiones del máximo.', 'Array vacío o con un solo valor distinto → null / None.']
  },
  dedupe: {
    examples: [
      { in: 'items = ["login", "cart", "login", "checkout", "cart"]', out: '["login", "cart", "checkout"]', why: 'Se queda la primera aparición de cada uno, en su orden original.' },
      { in: 'items = []', out: '[]' }
    ],
    rules: ['Conserva el orden de la primera aparición.', 'No ordenes alfabéticamente.']
  },
  summary: {
    examples: [
      { in: 'results = [\n  { name: "login",  status: "passed",  duration: 1200 },\n  { name: "cart",   status: "failed",  duration: 3400 },\n  { name: "search", status: "passed",  duration: 800 },\n  { name: "export", status: "skipped", duration: 0 }\n]', out: '{ total: 4, passed: 2, failed: 1, skipped: 1, passRate: 66.7 }', why: 'passRate = 2 / (2 + 1) × 100 = 66.666… → 66.7. Los skipped no cuentan.' },
      { in: 'results = []', out: '{ total: 0, passed: 0, failed: 0, skipped: 0, passRate: 0 }', why: 'Sin tests ejecutados, passRate es 0 (no dividas entre 0).' }
    ],
    rules: ['status solo puede ser "passed", "failed" o "skipped".', 'passRate redondeado a 1 decimal.', 'En Python las claves son strings: "total", "passed", …, "passRate".']
  },
  logs: {
    examples: [
      { in: 'lines = [\n  "INFO [auth] user logged in",\n  "ERROR [cart] timeout after 30000ms",\n  "ERROR [cart] element not found",\n  "WARN [search] slow response",\n  "ERROR [auth] 401 Unauthorized",\n  "garbage line"\n]', out: '{ cart: 2, auth: 1 }', why: 'Solo se cuentan las líneas ERROR. "garbage line" no tiene formato válido y se ignora.' },
      { in: 'lines = ["INFO [x] ok"]', out: '{ }' }
    ],
    rules: ['Formato: NIVEL [módulo] mensaje.', 'Ignora líneas mal formadas sin lanzar error.']
  },
  retry: {
    examples: [
      { in: 'fn falla 2 veces y luego devuelve "ok"; attempts = 3', out: '"ok"', why: 'Intento 1 falla, intento 2 falla, intento 3 devuelve "ok".' },
      { in: 'fn falla siempre; attempts = 2', out: 'lanza el error del 2.º intento ("fail 2")', why: 'Se agotaron los intentos: se relanza el último error, no el primero.' }
    ],
    rules: ['Llama a fn como máximo attempts veces.', 'Si un intento tiene éxito, devuelve su resultado de inmediato.', 'En JS/TS fn es async: usa await.', 'En los tests, flaky(n) crea una función que falla n veces y luego devuelve "ok".']
  },
  fizz: {
    examples: [
      { in: 'n = 5', out: '["1", "2", "Fizz", "4", "Buzz"]' },
      { in: 'n = 15  (último elemento)', out: '"FizzBuzz"', why: '15 es múltiplo de 3 y de 5.' },
      { in: 'n = 0', out: '[]' }
    ],
    rules: ['Múltiplo de 3 → "Fizz"; de 5 → "Buzz"; de ambos → "FizzBuzz".', 'Los demás números van como texto: "1", no 1.']
  },
  groupBy: {
    examples: [
      { in: 'cases = [\n  { suite: "auth", name: "login ok" },\n  { suite: "cart", name: "add item" },\n  { suite: "auth", name: "logout" }\n]', out: '{\n  auth: ["login ok", "logout"],\n  cart: ["add item"]\n}', why: 'Cada suite agrupa los nombres de sus tests, en el orden original.' },
      { in: 'cases = []', out: '{ }' }
    ],
    rules: ['Dentro de cada suite conserva el orden de entrada.', 'En JS/TS intenta resolverlo con reduce; en Java con Collectors.groupingBy.']
  },
  equalsHash: {
    examples: [
      { in: 'new User("QA@example.com", "Maria")\nnew User("qa@example.com", "María P.")', out: 'users.size() == 1', why: 'Mismo email ignorando mayúsculas → son el mismo usuario, aunque el nombre sea distinto.' }
    ],
    rules: ['Sobrescribe equals() y hashCode() usando el email.', 'Ambos métodos deben normalizar el email de la misma forma.']
  },
  pyclass: {
    examples: [
      { in: 'run = TestRun()\nrun.add("login", "passed")\nrun.add("cart", "failed")\nrun.add("pay", "failed")\nrun.failed_tests()', out: '["cart", "pay"]' },
      { in: 'TestRun().add("x", "broken")', out: 'lanza ValueError', why: '"broken" no es un estado válido.' },
      { in: 'TestRun().failed_tests()', out: '[]' }
    ],
    rules: ['Estados válidos: passed, failed, skipped.', 'failed_tests() conserva el orden en que se agregaron.']
  },
  'pw-login': { deliver: ['Test 1: llena Email y Password con getByLabel y hace clic en "Sign in" con getByRole.', 'Verifica que la URL termina en /dashboard con toHaveURL.', 'Verifica que se ve un heading con "Welcome".', 'Test 2: password incorrecto → un elemento con role="alert" con el mensaje de error.', 'Sin waitForTimeout ni sleeps.'] },
  'pw-pom': { deliver: ['Clase LoginPage con locators readonly creados en el constructor.', 'Métodos async goto() y login(email, password).', 'Fixture loginPage creada con test.extend que hace goto antes de entregar el objeto.', 'Un test que usa la fixture y deja el assert en el test, no en el Page Object.'] },
  'pw-mock': { deliver: ['page.route("**/api/products", …) registrado ANTES de page.goto.', 'Test 1: route.fulfill con status 200 y json [] → se ve "No products yet".', 'Test 2: status 500 → se ve "Something went wrong" y el botón "Retry" habilitado.'] },
  'pw-api': { deliver: ['POST /api/orders con request.post y body { sku, qty }.', 'Assert: status 201 y que el body trae un id.', 'Abrir /orders/{id} y verificar el texto "Pending".', 'DELETE del pedido aunque el test falle (try/finally o una fixture).'] },
  'pw-config': { deliver: ['baseURL desde process.env.BASE_URL con un valor por defecto.', 'retries: 2 y workers: 4 solo cuando process.env.CI existe.', 'trace "on-first-retry", screenshot "only-on-failure".', 'reporter html + junit.', 'Proyectos: setup → chromium y firefox, ambos con storageState.'] },
  'pw-tabs': { deliver: ['Popup: empieza a esperar waitForEvent("popup") antes del clic en "Terms" y valida la URL /terms.', 'Iframe: page.frameLocator("#payment") y llenar "Card number".', 'Descarga: waitForEvent("download") antes del clic en "Export CSV" y validar que el nombre termina en .csv.'] },
  'se-factory': { deliver: ['Un ThreadLocal<WebDriver> privado y estático.', 'init("chrome" | "firefox"), headless cuando la variable de entorno CI = true.', 'get() devuelve el driver del hilo actual.', 'quit() cierra el navegador y llama a remove().'] },
  'se-pom': { deliver: ['BasePage abstracta con WebDriver y WebDriverWait (10 s).', 'click(By) espera elementToBeClickable; type(By, text) espera visibilidad, limpia y escribe.', 'LoginPage con locators By privados.', 'login(user, pass) devuelve un DashboardPage (POM fluido).'] },
  'se-dp': { deliver: ['@BeforeMethod / @AfterMethod con alwaysRun = true usando DriverFactory.', '@DataProvider con 3 filas { query, hasResults }.', '@Test con dataProvider, groups = {"regression"} y retryAnalyzer.', 'Clase RetryOnce que reintenta una sola vez.'] },
  'se-restassured': { deliver: ['POST /users con body JSON { name, email } → statusCode 201.', 'Validar que id no es null y que email es el enviado.', 'Extraer el id y hacer GET /users/{id} → 200 y name correcto.'] },
  'py-fixture': { deliver: ['Fixture api_client con scope="session", usando requests.Session, yield y close().', 'Test con @pytest.mark.parametrize para (1, 200), (2, 200) y (999, 404), con ids legibles.', 'Marcado con @pytest.mark.smoke.'] },
  'py-pw': { deliver: ['Usar la fixture page de pytest-playwright.', 'Buscar "laptop" en el searchbox y presionar Enter.', 'expect(...).to_be_visible() en el primer resultado que contiene "laptop".', 'expect(page).to_have_title(...) con regex que ignore mayúsculas.'] }
};
EX.forEach(x => Object.assign(x, EXDOC[x.id] || {}));

// ================= STUDY GUIDES: step-by-step + docs per language =================
const DOC = {
  J: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/',
  JT: 'https://docs.oracle.com/javase/tutorial/',
  P: 'https://docs.python.org/es/3/',
  M: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/',
  TS: 'https://www.typescriptlang.org/docs/handbook/2/',
  PW: 'https://playwright.dev/docs/',
  PWPY: 'https://playwright.dev/python/docs/',
  SE: 'https://www.selenium.dev/documentation/webdriver/',
  PT: 'https://docs.pytest.org/en/stable/'
};
const D = DOC;
const GUIDES = {
  evens: {
    steps: ['Crea una colección nueva y vacía: ahí irá el resultado (así no tocas la original).', 'Recorre cada número del array.', 'Comprueba si es par con el operador resto: n % 2 == 0.', 'Si es par, agrégalo a la colección nueva.', 'Devuelve la colección nueva. Bonus: hazlo en una línea con filter / stream / comprehension.'],
    java: [['Arrays.stream(int[])', D.J + 'util/Arrays.html', 'Convierte el array en un IntStream.'], ['IntStream.filter() y toArray()', D.J + 'util/stream/IntStream.html', 'Filtra y vuelve a int[].'], ['Operador % (resto)', D.JT + 'java/nutsandbolts/op1.html', 'n % 2 == 0 indica par.']],
    python: [['List comprehensions', D.P + 'tutorial/datastructures.html#list-comprehensions', '[n for n in nums if ...]'], ['Operador % (módulo)', D.P + 'library/stdtypes.html#numeric-types-int-float-complex', 'n % 2 == 0 indica par.']],
    js: [['Array.prototype.filter()', D.M + 'Global_Objects/Array/filter', 'Devuelve un array NUEVO; no muta el original.'], ['Operador resto %', D.M + 'Operators/Remainder', 'Ojo: -3 % 2 es -1.']]
  },
  reverse: {
    steps: ['Crea un resultado vacío (string o lista de caracteres).', 'Recorre el string desde el último índice (length - 1) hasta 0.', 'Agrega cada carácter al resultado.', 'Alternativa: dos punteros (i al inicio, j al final) intercambiando en un array de caracteres.'],
    java: [['String.charAt() / toCharArray()', D.J + 'lang/String.html', 'Acceder a cada carácter.'], ['StringBuilder.append()', D.J + 'lang/StringBuilder.html', 'Construir strings en un loop de forma eficiente.']],
    python: [['range() con paso negativo', D.P + 'library/stdtypes.html#range', 'range(len(s) - 1, -1, -1)'], ['str.join()', D.P + 'library/stdtypes.html#str.join', 'Unir una lista de caracteres.']],
    js: [['for clásico', D.M + 'Statements/for', 'for (let i = s.length - 1; i >= 0; i--)'], ['String: acceso por índice', D.M + 'Global_Objects/String#acceso_a_caracteres', 's[i] o s.charAt(i)']]
  },
  palindrome: {
    steps: ['Normaliza: pasa a minúsculas y quédate solo con letras y dígitos.', 'Pon un puntero al inicio (i) y otro al final (j).', 'Mientras i < j, compara los caracteres; si son distintos devuelve false.', 'Avanza i y retrocede j. Si terminas el loop, devuelve true.'],
    java: [['Character.isLetterOrDigit()', D.J + 'lang/Character.html', 'Saltar signos y espacios.'], ['Character.toLowerCase()', D.J + 'lang/Character.html', 'Comparar sin mayúsculas.'], ['String.replaceAll() con regex', D.J + 'lang/String.html', 'Alternativa: s.replaceAll("[^A-Za-z0-9]", "")']],
    python: [['str.isalnum()', D.P + 'library/stdtypes.html#str.isalnum', '¿Es letra o dígito?'], ['str.lower()', D.P + 'library/stdtypes.html#str.lower', 'Minúsculas.'], ['Slicing [::-1]', D.P + 'library/stdtypes.html#common-sequence-operations', 'Invertir una secuencia (aquí sí se permite).']],
    js: [['String.prototype.toLowerCase()', D.M + 'Global_Objects/String/toLowerCase', 'Minúsculas.'], ['String.prototype.replace() con regex', D.M + 'Global_Objects/String/replace', 's.replace(/[^a-z0-9]/g, "")'], ['Expresiones regulares', 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_expressions', 'Clases de caracteres [^...]']]
  },
  freq: {
    steps: ['Crea un mapa vacío: clave = carácter, valor = cantidad.', 'Recorre cada carácter del string.', 'Si es un espacio, sáltalo (continue).', 'Si el carácter ya está en el mapa, suma 1; si no, ponlo en 1.', 'Devuelve el mapa.'],
    java: [['HashMap / LinkedHashMap', D.J + 'util/HashMap.html', 'LinkedHashMap mantiene el orden de inserción.'], ['Map.merge()', D.J + 'util/Map.html', 'map.merge(c, 1, Integer::sum) suma 1 o inicializa en 1.'], ['String.toCharArray()', D.J + 'lang/String.html', 'Recorrer carácter por carácter.']],
    python: [['dict y dict.get()', D.P + 'library/stdtypes.html#dict.get', 'freq.get(c, 0) + 1'], ['collections.Counter', D.P + 'library/collections.html#collections.Counter', 'Lo resuelve en una línea (menciónalo en la entrevista).']],
    js: [['for...of', D.M + 'Statements/for...of', 'Recorre los caracteres de un string.'], ['Objetos como diccionario', 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Working_with_objects', 'freq[c] = (freq[c] ?? 0) + 1'], ['Nullish coalescing ??', D.M + 'Operators/Nullish_coalescing', 'Valor por defecto si es undefined.']],
    ts: [['Record<K, V>', 'https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type', 'Tipo para objetos clave → valor.']]
  },
  dupes: {
    steps: ['Crea dos sets: seen (ya vistos) y duplicates.', 'Recorre los números: si ya está en seen, agrégalo a duplicates; si no, a seen.', 'Convierte duplicates a lista y ordénala ascendentemente.', 'Complejidad: O(n) para recorrer + O(k log k) para ordenar.'],
    java: [['HashSet.add()', D.J + 'util/HashSet.html', 'Devuelve false si el elemento ya existía: útil para detectar duplicados.'], ['TreeSet', D.J + 'util/TreeSet.html', 'Set que se mantiene ordenado automáticamente.']],
    python: [['set', D.P + 'library/stdtypes.html#set-types-set-frozenset', 'Membresía O(1) con "in".'], ['sorted()', D.P + 'library/functions.html#sorted', 'Devuelve una lista ordenada nueva.']],
    js: [['Set', D.M + 'Global_Objects/Set', 'has() y add() en O(1).'], ['Array.prototype.sort() con comparador', D.M + 'Global_Objects/Array/sort', 'Números: sort((a, b) => a - b). Sin comparador ordena como texto.'], ['Spread [...set]', D.M + 'Operators/Spread_syntax', 'Convertir un Set en array.']]
  },
  firstUnique: {
    steps: ['Primera pasada: cuenta cuántas veces aparece cada carácter en un mapa.', 'Segunda pasada: recorre el string de nuevo, en orden.', 'El primer carácter cuyo conteo sea 1 es la respuesta.', 'Si terminas sin encontrar ninguno, devuelve null / None.'],
    java: [['LinkedHashMap', D.J + 'util/LinkedHashMap.html', 'Mantiene el orden de inserción: puedes recorrer entrySet().'], ['Map.merge()', D.J + 'util/Map.html', 'Contar ocurrencias.']],
    python: [['dict (orden de inserción)', D.P + 'library/stdtypes.html#mapping-types-dict', 'Desde Python 3.7 los dict conservan el orden.'], ['None', D.P + 'library/constants.html#None', 'Valor de "no hay resultado".']],
    js: [['Map', D.M + 'Global_Objects/Map', 'get(), set() y orden de inserción garantizado.']],
    ts: [['Union types: string | null', D.TS + 'everyday-types.html#union-types', 'Tipar un resultado que puede no existir.']]
  },
  twoSum: {
    steps: ['Crea un mapa: valor → índice donde lo viste.', 'Para cada posición i, calcula el complemento: target - nums[i].', 'Si el complemento ya está en el mapa, devuelve [índiceDelComplemento, i].', 'Si no, guarda nums[i] → i en el mapa y sigue.', 'Si terminas el recorrido, devuelve un array vacío.'],
    java: [['HashMap<Integer, Integer>', D.J + 'util/HashMap.html', 'get() devuelve null si la clave no existe.']],
    python: [['enumerate()', D.P + 'library/functions.html#enumerate', 'Recorrer índice y valor a la vez.'], ['dict y operador in', D.P + 'library/stdtypes.html#mapping-types-dict', 'Búsqueda O(1).']],
    js: [['Map', D.M + 'Global_Objects/Map', 'get() devuelve undefined si no existe.'], ['Igualdad estricta', D.M + 'Operators/Strict_inequality', 'Compara con !== undefined (el índice 0 es falsy).']]
  },
  anagram: {
    steps: ['Normaliza ambos textos: minúsculas y sin espacios.', 'Opción A (O(n log n)): ordena los caracteres de cada uno y compara.', 'Opción B (O(n)): cuenta caracteres del primero en un mapa y resta con el segundo; todo debe quedar en 0.', 'Si las longitudes normalizadas difieren, ya puedes devolver false.'],
    java: [['Arrays.sort(char[])', D.J + 'util/Arrays.html', 'Ordenar caracteres.'], ['Arrays.equals()', D.J + 'util/Arrays.html', 'Comparar dos arrays elemento a elemento.']],
    python: [['sorted()', D.P + 'library/functions.html#sorted', 'sorted("abc") devuelve una lista de caracteres.'], ['collections.Counter', D.P + 'library/collections.html#collections.Counter', 'Counter(a) == Counter(b).']],
    js: [['split / sort / join', D.M + 'Global_Objects/String/split', 's.split("").sort().join("")'], ['String.prototype.replace()', D.M + 'Global_Objects/String/replace', 'Quitar espacios con /\\s/g.']]
  },
  secondLargest: {
    steps: ['Usa dos variables: first (el mayor) y second (el segundo mayor), empezando vacías / -∞.', 'Para cada n: si n > first, el antiguo first pasa a second y n pasa a first.', 'Si no, y n < first y n > second, actualiza second.', 'Los iguales al máximo se ignoran (así cumples "distinto").', 'Al final, si second sigue vacío devuelve null / None.'],
    java: [['Integer (wrapper) y null', D.J + 'lang/Integer.html', 'Usar Integer permite representar "no hay valor".']],
    python: [['set() y sorted(reverse=True)', D.P + 'library/functions.html#sorted', 'Alternativa corta: valores distintos ordenados de mayor a menor.'], ['float("-inf")', D.P + 'library/functions.html#float', 'Valor inicial más pequeño que cualquier número.']],
    js: [['-Infinity', D.M + 'Global_Objects/Infinity', 'Valor inicial más pequeño que cualquier número.']],
    ts: [['Union types: number | null', D.TS + 'everyday-types.html#union-types', 'Tipar un resultado opcional.']]
  },
  dedupe: {
    steps: ['Usa una estructura que no admita repetidos y que conserve el orden de inserción.', 'Inserta los elementos en orden.', 'Convierte el resultado de nuevo a lista.'],
    java: [['LinkedHashSet', D.J + 'util/LinkedHashSet.html', 'Set sin duplicados que mantiene el orden de inserción.'], ['ArrayList(Collection)', D.J + 'util/ArrayList.html', 'new ArrayList<>(set) para volver a lista.']],
    python: [['dict.fromkeys()', D.P + 'library/stdtypes.html#dict.fromkeys', 'list(dict.fromkeys(items)) conserva el orden.']],
    js: [['Set', D.M + 'Global_Objects/Set', 'Mantiene el orden de inserción.'], ['Spread [...set]', D.M + 'Operators/Spread_syntax', 'Volver a array.']]
  },
  summary: {
    steps: ['Inicia contadores: total = cantidad de resultados, passed = failed = skipped = 0.', 'Recorre los resultados y suma 1 al contador según status.', 'Calcula executed = passed + failed (los skipped no cuentan).', 'Si executed > 0, passRate = passed / executed × 100 redondeado a 1 decimal; si no, 0.', 'Devuelve el objeto / mapa con las 5 claves.'],
    java: [['record', 'https://docs.oracle.com/en/java/javase/21/language/records.html', 'TestResult ya está definido como record.'], ['Collectors.groupingBy() + counting()', D.J + 'util/stream/Collectors.html', 'Contar por status con Streams.'], ['Math.round()', D.J + 'lang/Math.html', 'Math.round(x * 10) / 10.0 para 1 decimal.']],
    python: [['round()', D.P + 'library/functions.html#round', 'round(x, 1)'], ['dict', D.P + 'library/stdtypes.html#mapping-types-dict', 'Acceder con r["status"].']],
    js: [['Array.prototype.reduce()', D.M + 'Global_Objects/Array/reduce', 'Acumular contadores.'], ['Math.round()', D.M + 'Global_Objects/Math/round', 'Math.round(x * 10) / 10 para 1 decimal.']],
    ts: [['Interfaces y literal types', D.TS + 'objects.html', 'Status = "passed" | "failed" | "skipped".']]
  },
  logs: {
    steps: ['Define una regex que capture el nivel y el módulo: ^(\\w+) \\[(.+?)\\]', 'Para cada línea, aplica la regex; si no coincide, ignórala.', 'Si el nivel capturado es ERROR, suma 1 al módulo capturado en un mapa.', 'Devuelve el mapa.'],
    java: [['Pattern y Matcher', D.J + 'util/regex/Pattern.html', 'Pattern.compile() una vez; matcher.find() y group(n).'], ['Map.merge()', D.J + 'util/Map.html', 'Contar por módulo.']],
    python: [['Módulo re: re.match()', D.P + 'library/re.html#re.match', 'm.group(1), m.group(2).'], ['Raw strings r"..."', D.P + 'library/re.html#raw-string-notation', 'Evitan escapar dos veces las barras.']],
    js: [['String.prototype.match()', D.M + 'Global_Objects/String/match', 'Devuelve null o un array con los grupos.'], ['Expresiones regulares', 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_expressions', 'Grupos de captura ( ).']]
  },
  retry: {
    steps: ['Declara una variable lastError fuera del loop.', 'Haz un loop de 0 a attempts - 1.', 'Dentro, en un try: llama (y en JS/TS espera con await) a fn y devuelve su resultado.', 'En el catch: guarda el error en lastError y deja que el loop continúe.', 'Al salir del loop, lanza lastError (throw / raise).'],
    java: [['Supplier<T>', D.J + 'util/function/Supplier.html', 'fn.get() ejecuta la función.'], ['try / catch', D.JT + 'essential/exceptions/try.html', 'Capturar RuntimeException.'], ['Generics <T>', D.JT + 'java/generics/methods.html', 'Métodos genéricos.']],
    python: [['try / except', D.P + 'tutorial/errors.html#handling-exceptions', 'Capturar Exception.'], ['raise', D.P + 'tutorial/errors.html#raising-exceptions', 'Relanzar el último error.']],
    js: [['async / await', D.M + 'Statements/async_function', 'Esperar una Promise dentro de try/catch.'], ['try...catch', D.M + 'Statements/try...catch', 'Capturar el error de un await.'], ['throw', D.M + 'Statements/throw', 'Relanzar el último error.']],
    ts: [['Generics', D.TS + 'generics.html', 'retry<T>(fn: () => Promise<T>): Promise<T>']]
  },
  fizz: {
    steps: ['Recorre k desde 1 hasta n (incluido).', 'Comprueba primero si k es múltiplo de 15 (de 3 y de 5).', 'Luego múltiplo de 3 → "Fizz", de 5 → "Buzz".', 'Si no, agrega el número convertido a texto.'],
    java: [['ArrayList', D.J + 'util/ArrayList.html', 'add() para construir la lista.'], ['String.valueOf()', D.J + 'lang/String.html', 'Convertir int a String.']],
    python: [['range(1, n + 1)', D.P + 'library/stdtypes.html#range', 'El final es exclusivo.'], ['str()', D.P + 'library/stdtypes.html#str', 'Convertir a texto.']],
    js: [['Array.from()', D.M + 'Global_Objects/Array/from', 'Array.from({ length: n }, (_, i) => ...)'], ['String()', D.M + 'Global_Objects/String/String', 'Convertir número a texto.']]
  },
  groupBy: {
    steps: ['Empieza con un objeto / mapa vacío.', 'Para cada caso, si su suite no existe en el mapa, créala con una lista vacía.', 'Agrega el name a la lista de su suite.', 'Devuelve el mapa.'],
    java: [['Collectors.groupingBy()', D.J + 'util/stream/Collectors.html', 'groupingBy(clasificador, LinkedHashMap::new, downstream)'], ['Collectors.mapping()', D.J + 'util/stream/Collectors.html', 'Transformar cada elemento (TestCase → name) dentro del grupo.']],
    python: [['dict.setdefault()', D.P + 'library/stdtypes.html#dict.setdefault', 'out.setdefault(suite, []).append(name)'], ['collections.defaultdict', D.P + 'library/collections.html#collections.defaultdict', 'Alternativa sin setdefault.']],
    js: [['Array.prototype.reduce()', D.M + 'Global_Objects/Array/reduce', 'Acumulador {} que vas llenando.'], ['Asignación lógica nula ??=', D.M + 'Operators/Nullish_coalescing_assignment', '(acc[s] ??= []).push(name)'], ['Desestructuración', D.M + 'Operators/Destructuring', '({ suite, name }) en los parámetros.']]
  },
  equalsHash: {
    steps: ['En equals: si es el mismo objeto devuelve true; si no es un User devuelve false.', 'Compara los emails con equalsIgnoreCase().', 'En hashCode: calcula el hash del email normalizado en minúsculas.', 'Prueba en main que el HashSet queda con tamaño 1.'],
    java: [['Object.equals() y hashCode()', D.J + 'lang/Object.html', 'Lee el "contrato" en la documentación de ambos métodos.'], ['instanceof con pattern matching', 'https://docs.oracle.com/en/java/javase/21/language/pattern-matching-instanceof.html', 'if (!(o instanceof User u)) return false;'], ['String.toLowerCase(Locale.ROOT)', D.J + 'lang/String.html', 'Normalizar sin depender del idioma del sistema.']]
  },
  pyclass: {
    steps: ['En __init__ crea una lista vacía para guardar los resultados.', 'En add: si status no está en VALID, lanza ValueError; si es válido, guarda (name, status).', 'En failed_tests: devuelve los nombres cuyo status sea "failed", en orden.'],
    python: [['Clases', D.P + 'tutorial/classes.html', '__init__, self y atributos de clase.'], ['raise ValueError', D.P + 'library/exceptions.html#ValueError', 'Error para valores inválidos.'], ['List comprehensions', D.P + 'tutorial/datastructures.html#list-comprehensions', 'Filtrar los fallidos.']]
  },
  'pw-login': {
    steps: ['Usa page.getByLabel("Email") y page.getByLabel("Password") con fill().', 'Haz clic con page.getByRole("button", { name: "Sign in" }).', 'Valida la navegación con await expect(page).toHaveURL(/dashboard/).', 'Para el error, valida page.getByRole("alert") con toContainText().'],
    ts: [['Locators', D.PW + 'locators', 'getByRole, getByLabel, getByText…'], ['Assertions', D.PW + 'test-assertions', 'toHaveURL, toBeVisible, toContainText.'], ['Auto-waiting', D.PW + 'actionability', 'Por qué no hacen falta sleeps.']]
  },
  'pw-pom': {
    steps: ['Declara los locators como propiedades readonly y créalos en el constructor.', 'Escribe métodos async que agrupen acciones (login).', 'Crea la fixture con base.extend: instancia la página, llama goto() y luego await use(lp).', 'Importa ese test en tus specs y pide { loginPage } como parámetro.'],
    ts: [['Page Object Models', D.PW + 'pom', 'Patrón oficial con ejemplo completo.'], ['Fixtures', D.PW + 'test-fixtures', 'test.extend y use().'], ['Classes en TypeScript', D.TS + 'classes.html', 'readonly y parameter properties.']]
  },
  'pw-mock': {
    steps: ['Antes de page.goto, registra page.route con el patrón de la URL de la API.', 'Dentro del handler usa route.fulfill({ status, json }).', 'Navega a la página y valida el estado vacío o de error con expect.'],
    ts: [['Mock APIs', D.PW + 'mock', 'page.route y route.fulfill.'], ['Network', D.PW + 'network', 'Interceptar, modificar y abortar requests.']]
  },
  'pw-api': {
    steps: ['Usa la fixture request: await request.post(url, { data }).', 'Valida res.status() y lee el body con await res.json().', 'Navega a la página del pedido y valida el estado con getByTestId.', 'Envuelve la validación en try/finally y borra el pedido en el finally.'],
    ts: [['API testing', D.PW + 'api-testing', 'APIRequestContext, request.post/get/delete.'], ['APIResponse', D.PW + 'api/class-apiresponse', 'status(), json(), ok().']]
  },
  'pw-config': {
    steps: ['Exporta defineConfig({...}).', 'Usa process.env.CI para decidir retries y workers.', 'En use: baseURL, trace, screenshot y video.', 'En projects: un proyecto setup y dos navegadores con dependencies: ["setup"] y storageState.'],
    ts: [['Test configuration', D.PW + 'test-configuration', 'Opciones globales y de use.'], ['Projects', D.PW + 'test-projects', 'Navegadores y dependencias.'], ['Authentication', D.PW + 'auth', 'storageState con proyecto setup.']]
  },
  'pw-tabs': {
    steps: ['Popup: const p = page.waitForEvent("popup"); luego el clic; luego await p.', 'Iframe: page.frameLocator("#payment") devuelve un locator dentro del frame.', 'Descarga: igual que el popup, pero con waitForEvent("download") y download.suggestedFilename().'],
    ts: [['Pages y popups', D.PW + 'pages', 'Múltiples pestañas y eventos popup.'], ['Frames', D.PW + 'frames', 'frameLocator.'], ['Downloads', D.PW + 'downloads', 'waitForEvent("download").']]
  },
  'se-factory': {
    steps: ['Declara private static final ThreadLocal<WebDriver> DRIVER = new ThreadLocal<>();', 'En init crea ChromeDriver o FirefoxDriver con sus Options (headless si CI) y guárdalo con DRIVER.set().', 'get() devuelve DRIVER.get().', 'quit() cierra el navegador y llama DRIVER.remove().'],
    java: [['ThreadLocal', D.J + 'lang/ThreadLocal.html', 'Una variable distinta por hilo.'], ['Browser options', D.SE + 'drivers/options/', 'ChromeOptions, FirefoxOptions y headless.'], ['switch expressions', 'https://docs.oracle.com/en/java/javase/21/language/switch-expressions-and-statements.html', 'Elegir el navegador con yield.']]
  },
  'se-pom': {
    steps: ['En el constructor de BasePage guarda el driver y crea new WebDriverWait(driver, Duration.ofSeconds(10)).', 'click: wait.until(ExpectedConditions.elementToBeClickable(locator)).click().', 'type: espera visibilityOfElementLocated, luego clear() y sendKeys().', 'LoginPage usa type y click y devuelve new DashboardPage(driver).'],
    java: [['Waits', D.SE + 'waits/', 'Explicit waits y ExpectedConditions.'], ['Page Object Models', 'https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/', 'Guía oficial de Selenium.'], ['Locators (By)', D.SE + 'elements/locators/', 'By.id, By.cssSelector…']]
  },
  'se-dp': {
    steps: ['@BeforeMethod(alwaysRun = true): DriverFactory.init(...); @AfterMethod: DriverFactory.quit().', '@DataProvider(name = "queries") devuelve Object[][] con 3 filas.', '@Test(dataProvider = "queries", groups = {"regression"}, retryAnalyzer = RetryOnce.class).', 'RetryOnce implementa IRetryAnalyzer con un contador que permite 1 reintento.'],
    java: [['TestNG: annotations', 'https://testng.org/#_annotations', 'Ciclo de vida de los tests.'], ['TestNG: DataProvider', 'https://testng.org/#_parameters_with_dataproviders', 'Tests parametrizados.'], ['TestNG: retry', 'https://testng.org/#_rerunning_failed_tests', 'IRetryAnalyzer.']]
  },
  'se-restassured': {
    steps: ['given(): baseUri, contentType(JSON) y body(map).', 'when().post("/users").', 'then(): statusCode(201) y body("campo", matcher).', 'extract().path("id") para usar el id en el GET siguiente.'],
    java: [['REST Assured: Usage', 'https://github.com/rest-assured/rest-assured/wiki/Usage', 'given / when / then, extract.'], ['Hamcrest matchers', 'https://hamcrest.org/JavaHamcrest/tutorial', 'equalTo, notNullValue…']]
  },
  'py-fixture': {
    steps: ['En conftest.py decora una función con @pytest.fixture(scope="session").', 'Crea requests.Session(), configura headers y haz yield de la sesión.', 'Después del yield, cierra la sesión.', 'En el test usa @pytest.mark.parametrize("user_id, status", [...]) y pide api_client como parámetro.'],
    python: [['Fixtures', D.PT + 'how-to/fixtures.html', 'scope, yield y conftest.py.'], ['Parametrize', D.PT + 'how-to/parametrize.html', 'Varios casos con un solo test.'], ['Markers', D.PT + 'how-to/mark.html', '@pytest.mark.smoke.'], ['requests.Session', 'https://requests.readthedocs.io/en/latest/user/advanced/#session-objects', 'Reutilizar conexión y headers.']]
  },
  'py-pw': {
    steps: ['Recibe page: Page como parámetro del test (fixture de pytest-playwright).', 'Navega con page.goto("/").', 'Llena el buscador con get_by_role("searchbox") y presiona Enter.', 'Valida con expect(locator).to_be_visible() y expect(page).to_have_title(re.compile(...)).'],
    python: [['Pytest plugin', D.PWPY + 'test-runners', 'Fixture page, --browser y opciones.'], ['Locators (Python)', D.PWPY + 'locators', 'get_by_role, filter.'], ['Assertions (Python)', D.PWPY + 'test-assertions', 'expect(...).to_be_visible().']]
  }
};
const TS_EXTRA = [['Tipos básicos de TypeScript', D.TS + 'everyday-types.html', 'number[], string, tipos de retorno.'], ['Funciones en TypeScript', D.TS + 'functions.html', 'Tipar parámetros y resultado.']];
EX.forEach(x => {
  const g = GUIDES[x.id]; if (!g) return;
  x.guide = { steps: g.steps, java: g.java, python: g.python, js: g.js,
    ts: x.review ? g.ts : [...(g.js || []), ...(g.ts || []), ...TS_EXTRA] };
});
