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
    @Published var users = [User].self
    
    
    // MARK: - POST
    func createUser(param: [String: Any], completion: @escaping (Bool) -> Void) {
        AF.request("\(API.baseURL)users", method: .post)
            .response { response in
                if response.response?.statusCode == 201 {
                    completion(true)
                }
                completion(false)
            }
    }
    
    // MARK: - GET
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
    
    func getUsers(email: String, completion: @escaping ([User]?) -> Void) {
        AF.request("\(API.baseURL)users", method: .get, headers: [.authorization(bearerToken: APIManager.token)])
            .responseJSON { result in
                if result.value != nil {
                    let decodedUser: [User] = try! JSONDecoder().decode([User].self, from: result.data!)
                    print(decodedUser)
                    completion(decodedUser)
                } else {
                    completion(nil)
                }
            }
    }
    
    // MARK: - DELETE
    func deleteUser(userId: Int, completion: @escaping (Bool) -> Void) {
        AF.request("\(API.baseURL)users/\(userId)", method: .delete, headers: [.authorization(bearerToken: APIManager.token)])
            .response { response in
                if response.response?.statusCode == 200 {
                    completion(true)
                }
                completion(false)
            }
    }
}
