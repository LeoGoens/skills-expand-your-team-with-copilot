import unittest

from fastapi import HTTPException

from src.backend.routers import activities as activities_router


class StubCollection:
    def __init__(self):
        self.last_query = None

    def find(self, query):
        self.last_query = query
        return []


class ActivitiesDifficultyFilterTests(unittest.TestCase):
    def setUp(self):
        self.stub_collection = StubCollection()
        activities_router.activities_collection = self.stub_collection

    def test_difficulty_all_filters_activities_without_difficulty(self):
        activities_router.get_activities(difficulty="all")
        self.assertEqual(
            self.stub_collection.last_query.get("difficulty"), {"$exists": False}
        )

    def test_difficulty_value_maps_to_stored_label(self):
        activities_router.get_activities(difficulty="beginner")
        self.assertEqual(self.stub_collection.last_query.get("difficulty"), "Beginner")

    def test_invalid_difficulty_raises_bad_request(self):
        with self.assertRaises(HTTPException) as context:
            activities_router.get_activities(difficulty="unexpected")

        self.assertEqual(context.exception.status_code, 400)


if __name__ == "__main__":
    unittest.main()
