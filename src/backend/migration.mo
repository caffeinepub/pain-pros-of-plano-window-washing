import Map "mo:core/Map";
import Text "mo:core/Text";
import List "mo:core/List";
import Principal "mo:core/Principal";

module {
  type OldQuoteRequest = {
    firstName : Text;
    lastName : Text;
    zipCode : Nat;
    address : Text;
    windowNumber : Nat;
    notes : ?Text;
  };

  type UserProfile = {
    name : Text;
  };

  type OldActor = {
    quoteRequests : Map.Map<Principal, OldQuoteRequest>;
    userProfiles : Map.Map<Principal, UserProfile>;
    maintenanceMode : Bool;
  };

  type NewQuoteRequest = {
    firstName : Text;
    lastName : Text;
    zipCode : Nat;
    address : Text;
    windowNumber : Nat;
    notes : ?Text;
    createdBy : Text;
  };

  type NewActor = {
    quoteRequests : List.List<NewQuoteRequest>;
    userProfiles : Map.Map<Principal, UserProfile>;
    maintenanceMode : Bool;
  };

  public func run(old : OldActor) : NewActor {
    let newQuoteRequests = List.empty<NewQuoteRequest>();

    for ((principal, oldRequest) in old.quoteRequests.entries()) {
      let newRequest : NewQuoteRequest = {
        oldRequest with
        createdBy = principal.toText()
      };
      newQuoteRequests.add(newRequest);
    };

    {
      old with
      quoteRequests = newQuoteRequests
    };
  };
};
