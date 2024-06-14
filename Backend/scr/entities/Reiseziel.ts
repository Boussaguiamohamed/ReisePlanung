import { object,string } from "yup";

import { Collection,Entity,Property, ManyToMany } from "@mikro-orm/core";

import { BaseEntity } from "./BaseEntity";
import { Reise } from "./Reise";


@Entity()
export class Reiseziel extends BaseEntity {
  [x: string]: any;
  @Property()
  name: string;

  @Property()
  beschreibung: string;

  @Property()
  datumvon: string;

  @Property()
  datumbis: string;

  @Property()
  activities: string;

  @ManyToMany(() => Reise)
  reisen = new Collection<Reise>(this);





constructor({name, beschreibung, datumvon, datumbis, activities,reisen}: CreateReisezielDTO) {   
    super();
    this.name = name;
    this.beschreibung = beschreibung;
    this.datumvon = datumvon;
    this.datumbis = datumbis;
    this.activities = activities;
    this.reisen = new Collection<Reise>(this);
    
  }

}

export const reisezielSchema = object({
    name: string().required(),
    beschreibung: string().required(),
    datumvon: string().required(),
    datumbis: string().required(),
    activities: string().required(),
    });

export type CreateReiseDTOreiseZiele =  Partial<Pick<Reise, 'name' | 'beschreibung' | 'teilnehmer'>>;


export type CreateReisezielDTO = {
        name: string;
        beschreibung: string;
        datumvon: string;
        datumbis: string;
        activities: string;
        reisen?: CreateReiseDTOreiseZiele[];
    };

