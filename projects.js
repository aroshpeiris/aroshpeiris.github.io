/* ============================================================
   FEATURED WORK  -  mekema wenas karanna (index.html / script.js ona na)

   CATS     : home page eke penna cards 3 (video / design / marketing)
              cover: card eke background photo (optional), e.g. 'works/video.jpg'
   PROJECTS : hama category ekakatama projects list ekak. Project ekak mehema:
     title : project eke nama
     desc  : short description
     thumb : card eke photo, e.g. 'works/video1.jpg'
     ---- click karama mokakda wenne (ekak witharak danna) ----
     video : 'works/video1.mp4'   -> site eke player ekak athule sound ekka play wenawa
     image : 'designs/design1.jpg'-> loku photo ekak (lightbox) widiyata penenawa
     link  : 'https://...'        -> Instagram / Facebook / TikTok / YouTube aluth tab ekaka open wenawa
   Project ekak add karanna: { ... }, ekak copy karala list ekata dammanna.
   ============================================================ */
var CATS = [
  { id: 'video',     title: 'Video',     desc: 'Reels, promos and edits made to hold attention.',        cover: 'works/video.jpg' },
  { id: 'design',    title: 'Design',    desc: 'Posts, logos and brand visuals that stand out.',          cover: 'works/design.jpg' },
  { id: 'marketing', title: 'Marketing', desc: 'Social media content and campaigns made to grow brands.', cover: 'works/marketing.jpg' }
];

var PROJECTS = {
  video: [
    { title: 'Video Project 1', desc: 'Short description of this project.', thumb: 'project1.jpg', link: 'https://www.instagram.com/chanaka_arosh' },
    { title: 'Video Project 2', desc: 'Short description of this project.', thumb: 'project2.jpg', link: 'https://www.facebook.com/share/1DnDnbj6gX/' },
    { title: 'Video Project 3', desc: 'Short description of this project.', thumb: 'project6.jpg', link: 'https://www.tiktok.com/@chanaka_arosh' }
  ],
  design: [
    { title: 'Design Project 1', desc: 'Short description of this project.', thumb: 'project3.jpg', image: 'designs/design1.jpg' }
  ],
  marketing: [
    { title: 'Marketing Project 1', desc: 'Short description of this project.', thumb: 'project5.jpg', image: 'designs/marketing1.jpg' }
  ]
};
