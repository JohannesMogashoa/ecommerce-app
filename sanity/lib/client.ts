import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, useCdn } from "../env";

export const client = createClient({
    apiVersion,
    dataset,
    projectId,
    useCdn,
    token: "skmYyQffGVg5LduyVrty3LcWl7nq4MdVzYJj0QgeDcBlwjVhgv0dQQqytHo7rnDXmiG0mUhpCQ4hn1nZngR3ndD8EAR5PX7sb6pXwur64ZNljcJtoeXLJy5eiUeDPvAQjSj8AJCjxkNG5gvbmvjr4LXIzd2wVK1Y9lGqZ9JXAYouCscsCQQh",
});
