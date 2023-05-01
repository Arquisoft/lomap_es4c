import { Session, fetch } from '@inrupt/solid-client-authn-browser';
import { getFile, getDecimal, getProfileAll, addIri, getStringNoLocale, saveFileInContainer, overwriteFile, getUrlAll, buildThing, getSolidDataset, createSolidDataset, createThing, Thing, removeThing, setThing, getThing, getThingAll, addUrl, addStringNoLocale, getSolidDatasetWithAcl, getUrl, saveSolidDatasetAt } from '@inrupt/solid-client';
import { FOAF, VCARD } from "@inrupt/vocab-common-rdf";

export async function getProfileSolid(webid: String, session: Session) {
    const dataset = await getSolidDataset(webid.toString());
    const perfil = getThing(dataset, webid.toString()) as Thing;
    const knows = getUrlAll(perfil, FOAF.knows);
    var profiles;
    if (knows !== undefined) {
        profiles = String(knows).split(",");

    }
    let direccion = getUrlAll(perfil, VCARD.hasAddress);

    let nombrecorto = getStringNoLocale(perfil, VCARD.fn);

    let name = getStringNoLocale(perfil, FOAF.name);

    let foto = getStringNoLocale(perfil, VCARD.hasPhoto);

    let telefoo = getStringNoLocale(perfil, VCARD.hasTelephone);


    let organizacion = getStringNoLocale(perfil, VCARD.organization_name);


    return [profiles, direccion, name, foto, telefoo, organizacion, nombrecorto];
}
