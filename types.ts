export type RoleType = 'gong' | 'shou';

export interface Actor {
  name: string;
  photo_url: string;
  tags: string[];
  role_type: RoleType;
}

export interface Pairing {
  gong: Actor;
  shou: Actor;
}