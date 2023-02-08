//
//  APIManager.swift
//  HeresAFilm
//
//  Created by Niall Rooney on 08/02/2023.
//

import SwiftUI
import Alamofire

final class APIManager: ObservableObject {
    
    static var token = UserDefaults.standard.string(forKey: "accessToken") ?? "nil"
    @Published var user = User.self
    
    func getUser(email: String, completion: @escaping (User?) -> Void) {
        AF.request("\(API.baseURL)users/\(email)", method: .get, headers: [.authorization(bearerToken: APIManager.token)])
            .responseJSON { result in
                if result.value != nil {
                    let decodedUser: User = try! JSONDecoder().decode(User.self, from: result.data!)
                    print(decodedUser)
                    completion(decodedUser)
                } else {
                    completion(nil)
                }
            }
    }
}
