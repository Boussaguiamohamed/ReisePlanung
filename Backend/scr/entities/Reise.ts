import { object,string } from "yup";

import { Collection,Entity,ManyToMany,Property } from "@mikro-orm/core";

import { BaseEntity } from "./BaseEntity";
import {Reiseziel} from './Reiseziel';

@Entity()
export class Reise extends BaseEntity {
  @Property()
  name: string;

  @Property()
  beschreibung: string;

  @Property()
  teilnehmer: string;

  @ManyToMany(() => Reiseziel, e => e.reisen)
  reiseziel = new Collection<Reiseziel>(this);


  constructor({name, beschreibung, teilnehmer}: CreateReiseDTO) {
    super();
    this.name = name;
    this.beschreibung = beschreibung;
    this.teilnehmer = teilnehmer;
  }
}

export const reiseSchema = object({
  name: string().required(),
  beschreibung: string().required(),
  teilnehmer: string().required(),
}); 


export type CreateReiseDTO = {
    name: string;
    beschreibung: string;
    teilnehmer: string;
    
};