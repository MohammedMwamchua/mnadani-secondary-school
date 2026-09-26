import React, { useState } from "react";
import { Trophy, Layers, Music, Sparkles, Star } from "lucide-react";
import { C, serif } from "../config/theme";
import { Section, PageHero, Tag, AwardCard, PlaceholderNote, Button } from "../components/ui";
import { AlbumCard, AlbumLightbox, ViewPhotosButton } from "../components/Albums";
import { useFetch } from "../lib/useFetch";
import { fetchAwards, fetchClubActivities, fetchGalleryAlbums } from "../lib/api";
import { pathFor } from "../lib/routes";

const TAG_ICONS = { Sports: Trophy, Clubs: Layers, Culture: Music };
const STUDENT_LIFE_ALBUMS = ["sports", "clubs", "cultural"];

function ClubCard({ g }) {
  const [broken, setBroken] = useState(false);
  const [viewing, setViewing] = useState(false);
  const Icon = TAG_ICONS[g.tag] ?? Sparkles;
  const showImage = Boolean(g.photo) && !broken;
  const allPhotos = [...(showImage ? [{ id: "cover", src: g.photo, caption: "" }] : []), ...g.extraPhotos];

  const details = (
    <>
      <Tag>{g.tag}</Tag>
      <h3 className="font-semibold" style={serif}>{g.title}</h3>
      <p className="text-sm mt-1" style={{ color: C.inkSoft }}>{g.body}</p>
      {g.achievements && (
        <div className="flex items-start gap-1.5 text-xs mt-2.5 pt-2.5" style={{ color: C.blueDeep, borderTop: `1px solid ${C.line}` }}>
          <Star size={12} className="mt-0.5 flex-shrink-0" /> {g.achievements}
        </div>
      )}
      {g.extraPhotos.length > 0 && (
        <ViewPhotosButton count={allPhotos.length} onClick={() => setViewing(true)} />
      )}
      {viewing && (
        <AlbumLightbox album={{ name: g.title, icon: Icon, photos: allPhotos }} onClose={() => setViewing(false)} />
      )}
    </>
  );

  if (showImage) {
    return (
      <div className="rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md" style={{ background: C.white, border: `1px solid ${C.line}` }}>
        <img src={g.photo} alt={g.title} className="w-full h-36 object-cover" onError={() => setBroken(true)} />
        <div className="p-5">{details}</div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl p-5 shadow-sm transition-all duration-300 hover:shadow-md" style={{ background: C.white, border: `1px solid ${C.line}` }}>
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: C.blueTint }}>
          <Icon size={19} color={C.blueDeep} />
        </div>
        <div>{details}</div>
      </div>
    </div>
  );
}

function CardsSkeleton({ count = 4, cols = "sm:grid-cols-2" }) {
  return (
    <div className={`grid ${cols} gap-5 animate-pulse`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl p-5" style={{ background: C.white, border: `1px solid ${C.line}` }}>
          <div className="h-5 w-16 rounded-full" style={{ background: C.blueTint }} />
          <div className="h-4 w-2/3 rounded mt-3" style={{ background: C.blueTint }} />
          <div className="h-3 w-full rounded mt-3" style={{ background: C.blueTint }} />
        </div>
      ))}
    </div>
  );
}

export default function StudentLife() {
  const clubs = useFetch(fetchClubActivities);
  const achievements = useFetch(() => fetchAwards("student"));
  const gallery = useFetch(fetchGalleryAlbums);
  const [openAlbum, setOpenAlbum] = useState(null);

  const albums = (gallery.data ?? []).filter(
    (a) => STUDENT_LIFE_ALBUMS.includes(a.category) && (a.photoCount > 0 || a.videoCount > 0)
  );

  return (
    <>
      <PageHero title="More than a classroom." lead="Clubs, sports, and activities that round out the school day." />
      <Section kicker="Clubs & activities" title="What students get involved in">
        {clubs.loading && <CardsSkeleton />}

        {!clubs.loading && clubs.error && (
          <PlaceholderNote>
            This section couldn't be loaded right now — please check back soon.
          </PlaceholderNote>
        )}

        {!clubs.loading && !clubs.error && clubs.data.length === 0 && (
          <PlaceholderNote>
            Clubs and activities are coming soon.
          </PlaceholderNote>
        )}

        {!clubs.loading && !clubs.error && clubs.data.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-5">
            {clubs.data.map((g) => (
              <ClubCard key={g.id} g={g} />
            ))}
          </div>
        )}
      </Section>
      <Section band kicker="Recognition" title="Achievements" lead="Wins and recognition from sports, clubs, and cultural events.">
        {achievements.loading && <CardsSkeleton count={3} cols="sm:grid-cols-2 md:grid-cols-3" />}

        {!achievements.loading && achievements.error && (
          <PlaceholderNote>
            This section couldn't be loaded right now — please check back soon.
          </PlaceholderNote>
        )}

        {!achievements.loading && !achievements.error && achievements.data.length === 0 && (
          <PlaceholderNote>
            Achievements are coming soon.
          </PlaceholderNote>
        )}

        {!achievements.loading && !achievements.error && achievements.data.length > 0 && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {achievements.data.map((a) => (
              <AwardCard key={a.id} title={a.title} meta={a.meta} body={a.body} image={a.image} extraPhotos={a.extraPhotos} />
            ))}
          </div>
        )}
      </Section>
      {albums.length > 0 && (
        <Section kicker="In pictures" title="Sports, clubs, and culture on camera" lead="Photos and videos from sports days, club activities, and cultural events.">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {albums.map((a) => (
              <AlbumCard key={a.id} album={a} onOpen={setOpenAlbum} />
            ))}
          </div>
          <div className="mt-8">
            <Button to={pathFor("gallery")} variant="secondary">See the full gallery</Button>
          </div>
        </Section>
      )}

      {openAlbum && <AlbumLightbox album={openAlbum} onClose={() => setOpenAlbum(null)} />}
    </>
  );
}
