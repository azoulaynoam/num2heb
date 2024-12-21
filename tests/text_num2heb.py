import unittest
from num2heb import number_to_words  # Adjust the import based on the actual function name

class TestMyPyPiPackage(unittest.TestCase):

    def test_number_to_word(self):
        # Example test cases
        self.assertEqual(number_to_words(1856000), "מיליון ושמונה מאות חמישים ושישה אלף")
        self.assertEqual(number_to_words(643000), "שש מאות ארבעים ושלושה אלף")
        self.assertEqual(number_to_words(213000), "מאתיים ושלושה עשר אלף")
        self.assertEqual(number_to_words(450000), "ארבע מאות וחמישים אלף")
        self.assertEqual(number_to_words(550000), "חמש מאות וחמישים אלף")
        self.assertEqual(number_to_words(213556), "מאתיים ושלושה עשר אלף וחמש מאות חמישים ושישה")
        self.assertEqual(number_to_words(95478245113), "תשעים וחמישה מיליארד וארבע מאות שבעים ושמונה מיליון ומאתיים ארבעים וחמישה אלף ומאה ושלושה עשר")
        
if __name__ == '__main__':
    unittest.main()