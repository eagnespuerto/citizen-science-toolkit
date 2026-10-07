# Project status check — October 2026

Checked on 2026-10-07 to keep `assets/js/data.js` current.

## Method
- **Zooniverse:** I queried the public Panoptes API (`/api/projects?launch_approved=true&state=live`), which returned 69 live, launch-approved projects, plus the `paused` and tag-based lists. I then checked the state of every Zooniverse project linked from the site.
- **Elsewhere:** I loaded each external project URL, read the BOINC project list (boinc.berkeley.edu/projects.php) and NASA's citizen science index (science.nasa.gov/citizen-science), and searched for activity in 2026 on projects most likely to have stopped.

## Corrections
| Project | Finding | Action |
| --- | --- | --- |
| Backyard Worlds: Planet 9 | Zooniverse state `paused` | Replaced with Backyard Worlds: Cool Neighbors (live) |
| AI4Mars | Zooniverse state `finished` | Removed |
| Cohere For AI / Aya | Renamed Cohere Labs (April 2025); Aya now runs inside its Open Science Community | Renamed entry and changed link |

## Additions (all confirmed active)
- **Astronomy:** Rubin Comet Catchers, Kilonova Seekers, Gravity Spy, Cosmic Collisions (JWST). All live on Zooniverse.
- **Biology:** Stall Catchers (event held April 2026), Eterna, Penguin Watch, Squirrel Mapper (live on Zooniverse), Rosetta@home (BOINC).
- **Mathematics:** LODA (BOINC, OEIS program mining), NumberFields@home (BOINC, ASU), Terence Tao's explicit analytic number theory network (launched January 2026). bbchallenge is still active and published monthly BB(6) reports through September 2026.
- **AI:** Spiral Graph: Cluster Buster, Savanna Spy: Sound, Science Scribbler: Placenta Profiles, European Camera Trap Project. All are live Zooniverse projects that train or verify ML models.

## Notes
- Zooniverse has **no live mathematics projects**. Mathematics citizen science happens on BOINC (PrimeGrid, LODA, NumberFields@home, Amicable Numbers, SRBase, Ramanujan Machine) and in open collaborations (bbchallenge, Lean projects, OEIS, Erdős Problems).
- Rubin Alert Explorers and Rubin Difference Detectives are `paused` between data releases, so I didn't list them. Check them again after Rubin's next alert-stream update.
- aavso.org returned 403 to automated requests and iascsearch.org didn't connect through the proxy. Neither result shows the project has stopped.
