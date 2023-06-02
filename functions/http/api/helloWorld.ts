export function helloWorld(request:functionArgument):returnValue {
    const { pathParams, queryParams, site } = request
    
    return {
        body: "Hello World",
        headers: {},
        statusCode: 200
    }
}


// export default helloWorld=(request:functionArgument):returnValue=>{
//     const { pathParams, queryParams, site } = request
    
//     return {
//         body: "Hello World",
//         headers: {},
//         statusCode: 200
//     }
// };
// export default helloWorld;


interface functionArgument {
    /** Object containing each query parameter as  */
    queryParams: { [key: string]: string},
    
    /** Internal ID of the site branch. */
    pathParams: { [key: string]: string},
    
    /** Site object containing all deploy-related information. */
    site: Site
}

interface Site {
    /** Internal ID of the site branch. */
    branchId: string,
    
    /** Internal ID of the Yext account. */
    businessId: string,
    
    /** Display name of the Yext account. */
    businessName: string,
    
    /** The Git commit hash associated with the deploy. */
    commitHash: string,
    
    /** The Git commit message associated with the deploy. */
    commitMessage: string,
    
    /** Internal ID for the deploy. */
    deployId: string,
    
    /** The "base URL" used for reverse proxying, as specified in serving.json. */
    displayUrlPrefix: string,
    
    /** Environment in which a request is invoked. */
    invocationContext: 'local' | 'preview' | 'staging' | 'production' | null;
    
    /** External ID of the Yext account. */
    partnerId: string,
    
    /** URL of the deploy in the Yext platform. */
    platformUrl: string,
    
    /** URL of preview domain associated with the deploy. */
    previewDomain: string,
    
    /** URL of production domain associated with the deploy. */
    productionDomain: string,
    
    /** Name of the GitHub branch associated with the deploy. */
    repoBranchName: string,
    
    /** URL of the GitHub branch associated with the site. */
    repoBranchUrl: string,
    
    /** URL of the GitHub repo associated with the site. */
    repoUrl: string,
    
    /** Internal ID of the site. */
    siteId: string,
    
    /** Display name of the site. */
    siteName: string,
    
    /** URL of staging domain associated with the deploy. */
    stagingDomain: string,
    
    /** Universe of the Yext account. */
    yextUniverse: "development" | "qa" | "sandbox" | "production" | null;
}

interface returnValue {
    /** HTTP response body (refer to MDN Web Docs). */
    body: string,
    
    /** HTTP response status code (refer to MDN Web Docs). */
    statusCode: number,
    
    /** HTTP response headers (refer to MDN Web Docs).  */
    headers: object
}
