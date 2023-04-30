import {
    getSolidDatasetWithAcl,
    hasResourceAcl,
    hasFallbackAcl,
    hasAccessibleAcl,
    createAclFromFallbackAcl,
    getResourceAcl,
    setAgentResourceAccess,
    saveAclFor,
    universalAccess
} from "@inrupt/solid-client";



export async function permisosAccesoPod(webId: string, friendWebId: string) {
    const mapPointsUrl = webId.replace("profile/card#me", "") + 'public/lomap/Map';
    const friend = friendWebId.replace("profile/card#me", "");
    const myDatasetWithAcl = await getSolidDatasetWithAcl(mapPointsUrl);

    let resourceAcl;
    if (!hasResourceAcl(myDatasetWithAcl)) {
        if (!hasAccessibleAcl(myDatasetWithAcl)) {
           
            throw new Error(
                "The current user does not have permission to change access rights to this Resource."
            );

        }
        if (!hasFallbackAcl(myDatasetWithAcl)) {
           
            throw new Error(
                "The current user does not have permission to see who currently has access to this Resource."
            );

        }
        resourceAcl = createAclFromFallbackAcl(myDatasetWithAcl);
    } else {
        resourceAcl = getResourceAcl(myDatasetWithAcl);
    }

    // Give someone Control access to the given Resource:
    const updatedAcl = setAgentResourceAccess(
        resourceAcl,
        friend,
        { read: true, append: false, write: false, control: false }
    );

    // Now save the ACL:
    await saveAclFor(myDatasetWithAcl, updatedAcl);
}


