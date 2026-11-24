export interface EventSpeaker {
  name: string;
  talkTitle: string;
  description?: string;
  slides?: string;
  videoUrl?: string;
}

export interface EventPartner {
  name?: string;
  logo?: string;
  url?: string;
}

export interface Event {
  title: string;
  date: string;
  dateLabel?: string;
  venue?: string;
  summary?: string;
  lumaUrl?: string;
  speaker1: EventSpeaker;
  speaker2: EventSpeaker;
  speaker3: EventSpeaker;
  hostedBy?: EventPartner;
  sponsoredBy?: EventPartner;
  supportedBy?: EventPartner;
}
