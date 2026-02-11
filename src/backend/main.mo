import Map "mo:core/Map";
import Text "mo:core/Text";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Migration "migration";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

// Apply migration using the with clause
(with migration = Migration.run)
actor {
  public type QuoteRequest = {
    firstName : Text;
    lastName : Text;
    zipCode : Nat;
    address : Text;
    windowNumber : Nat;
    notes : ?Text;
    createdBy : Text; // Could be "anonymous" or principal ID
  };

  public type UserProfile = {
    name : Text;
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let quoteRequests = List.empty<QuoteRequest>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var maintenanceMode : Bool = false;

  //----------------------------------------------
  //  Maintenance Mode
  //----------------------------------------------

  public shared ({ caller }) func setMaintenanceMode(mode : Bool) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can set maintenance mode");
    };
    maintenanceMode := mode;
  };

  public query func isMaintenanceMode() : async Bool {
    maintenanceMode;
  };

  //----------------------------------------------
  //  User Profile Management
  //----------------------------------------------

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile or must be admin");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  //----------------------------------------------
  //  Quote Request Management
  //----------------------------------------------

  public shared ({ caller }) func submitQuoteRequest(request : QuoteRequest) : async () {
    // No authorization check - any visitor including anonymous can submit
    quoteRequests.add(request);
  };

  public query ({ caller }) func getAllQuoteRequests() : async [QuoteRequest] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view quote requests");
    };
    quoteRequests.toArray();
  };

  public query ({ caller }) func isAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

};
