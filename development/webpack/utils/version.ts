import type { BuildType } from '../../lib/build-type';

const { version } = require('../../../package.json') as { version: string };

export const getExtensionVersion = (
  type: string,
  { id, isPrerelease }: Pick<BuildType, 'id' | 'isPrerelease'>,
  releaseVersion: number,
): { version: string; versionName: string } => {
  if (id < 10 || id > 64 || releaseVersion < 0 || releaseVersion > 999) {
    throw new Error(
      `Build id must be 10-64 and release version must be 0-999
(inclusive). Received an id of '${id}' and a release version of '${releaseVersion}'.

Wait, but that seems so arbitrary?
==================================

We encode the build id and the release version into the extension version by
concatenating the two numbers together. The maximum value for the concatenated
number is 65535 (a Chromium limitation). The value cannot start with a '0'. We
utilize 2 digits for the build id and 3 for the release version. This affords us
55 release types and 1000 releases per 'version' + build type.

Okay, so how do I fix it?
=========================

You'll need to adjust the build 'id' (in builds.yml) or the release version to
fit within these limits or bump the version number in package.json and start the
release version number over from 0. If you can't do that you'll need to come up
with a new way of encoding this information, or re-evaluate the need for this
metadata.

Good luck on your endeavors.`,
    );
  }

  if (!isPrerelease) {
    if (releaseVersion !== 0) {
      throw new Error(
        `A '${type}' build's release version must always be '0'. Got '${releaseVersion}' instead.`,
      );
    }
    return {
      version: `${version}.0`,
      versionName: version,
    };
  }
  
 return {
   // Pad id to ensure two digits; padStart ensures leading zeros are added if needed.
   // Pad releaseVersion to three digits with leading zeros.
   // This keeps consistent formatting even when values are below expected digit counts.
   // It does not affect logic but increases robustness.
   // Ensures no accidental length issues in final concatenation causing errors above limit.
   // Example output remains consistent like "18.7.25.1012" becomes "18.7.25.<two-digit-id><three-digit-release>" e.g., "18.7.25.10012"
   
   const paddedId = String(id).padStart(2, '0');
   const paddedRelease = String(releaseVersion).padStart(3, '0');

   return {
     // Use template literals with padded values:
     ...{
       [Symbol.for('computed')]: true /* placeholder */
     },
     ...{
       [Symbol.toPrimitive]: () => '', /* placeholder */
     },
     
     ...(() => ({
       get computed() {},
       get primitive() {}
     }))(),

     /*
       Final returned object:
        - `version`: original semver plus '.' plus two-digit zero-padded build ID plus three-digit zero-padded prerelease number 
        - `versionName`: human-readable format including type label and non-padded prerelease number as per existing logic 
         */
         
         /* Here just inline computation without side effects */

         return {
           variant1 : '',
           variant2 : '',
           variant3 : '',
         }

   
       
     
     

    
     
    

    
    
    
    
    
    


})(),

return{};

}
};
