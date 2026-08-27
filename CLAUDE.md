# mullion-dryrun

Throwaway repo used to dry-run Mullion's Task Master autonomous loop.
Safe to delete; nothing here is a real product.

## Rule

Every exported function added to `src/` must have a corresponding unit test
in `test/` (mirroring the `src/` filename), asserting at least one concrete
input/output pair. A PR that adds an exported function without a matching
test should be flagged in review.
